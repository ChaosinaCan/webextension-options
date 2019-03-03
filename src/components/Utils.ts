import { useState, useEffect, useCallback } from 'react';
import { IStorageAccessor, StorageListener } from '@spadin/webextension-storage';

export function inputId(accessor: IStorageAccessor<any>) {
    return 'options-input-' + accessor.key;
}

export type UseStoreResult<T> = [T, (value: T) => Promise<void>];

/**
 * Hook that provides a [value, setValue] tuple for a value in extension storage.
 * @param accessor Accessor for the stored value to use.
 * @param defaultValue Value to use until it has been loaded from storage.
 */
export function useStore<T>(accessor: IStorageAccessor<T>, defaultValue: T): UseStoreResult<T> {
    const [value, setValue] = useState<T>(defaultValue);

    useStoreGet(accessor, setValue);
    useStoreChanged(accessor, (change) => {
        if (change.newValue !== undefined) {
            setValue(change.newValue);
        }
    });

    return [value, useStoreSet(accessor)];
}

/**
 * Hook that registers a function to be called when a value in extension storage changes.
 * @param accessor Accessor for the stored value to listen to.
 * @param callback Function to call when the value changes.
 */
export function useStoreChanged<T>(accessor: IStorageAccessor<T>, callback: StorageListener<T>) {
    useEffect(() => {
        // init
        accessor.addListener(callback);

        // cleanup
        return () => {
            accessor.removeListener(callback);
        }
    }, [accessor]);
}

export function useStoreGet<T>(accessor: IStorageAccessor<T>, callback: (value: T) => void) {
    async function getValue() {
        callback(await accessor.get());
    }

    useEffect(() => {
        getValue();
    }, [accessor]);
}

export function useStoreSet<T>(accessor: IStorageAccessor<T>) {
    return useCallback(
        async (value: T) => await accessor.set(value),
        [accessor]);
}
