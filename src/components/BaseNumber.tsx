import * as React from 'react';
import { useState } from 'react';
import { IStorageAccessor } from '@spadin/webextension-storage';

import { inputId, useStoreGet, useStoreSet, useStoreChanged } from './Utils';
import { OptionalLabel } from './OptionalLabel';

export interface BaseNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Accessor for the setting to bind to. */
    accessor: IStorageAccessor<number>;
    /** Text label for the input field. */
    label?: string;
    /** Secondary text with a more detailed description of the setting. */
    description?: string;

    /** The minimum value to accept. */
    min?: number | string;
    /** The minimum value to accept. */
    max?: number | string;
    /** Stepping interval to use when adjusting the value. */
    step?: number | 'any';

    /** Display the current value next to the field? */
    showValue?: boolean;
}

/**
 * Generic number input field.
 */
export const BaseNumber: React.FunctionComponent<BaseNumberProps> = (props) => {
    const { type, accessor, label, description, showValue, ...inputProps } = props;

    // Use a separate display value state to track the text the user has entered
    // in the <input> field. We only want to update the persistent value if
    // the field contains a valid value, but it is jarring if we keep rewriting
    // the value to make it match the last valid value.
    const [displayValue, setDisplayValue] = useState('');
    const setStore = useStoreSet(accessor);
    const id = inputId(accessor);

    useStoreGet(accessor, (value) => {
        setDisplayValue(value.toString());
    });

    useStoreChanged(accessor, (change) => {
        if (change.newValue !== undefined) {
            setDisplayValue(change.newValue.toString());
        }
    });

    function isValid(value: number) {
        if (isNaN(value)) {
            return false;
        }

        if (props.min !== undefined && value < props.min) {
            return false;
        }

        if (props.max !== undefined && value > props.max) {
            return false;
        }

        return true;
    }

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDisplayValue(e.currentTarget.value);

        if (isValid(e.currentTarget.valueAsNumber)) {
            await setStore(e.currentTarget.valueAsNumber);
        }
    }

    return (
        <span className="input number browser-style">
            <OptionalLabel id={id} text={label} subtext={description} />
            {showValue &&
                <output>{displayValue}</output>
            }
            <input
                type={type}
                value={displayValue}
                onChange={handleChange}
                {...inputProps}
                />
        </span>
    )
}

export default BaseNumber;
