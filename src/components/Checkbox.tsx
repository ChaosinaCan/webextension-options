import * as React from 'react';

import { IStorageAccessor } from '@spadin/webextension-storage';

import { OptionalLabel } from './OptionalLabel';
import { inputId, useStore } from './Utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Accessor for the setting to bind to. */
    accessor: IStorageAccessor<boolean>;
    /** Text label for the input field. */
    label?: string;
    /** Secondary text with a more detailed description of the setting. */
    description?: string;
}

/**
 * Checkbox or on/off switch input field.
 */
export const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => {
    const { accessor, label, description, ...inputProps } = props;

    const [checked, setChecked] = useStore(accessor, false);
    const id = inputId(accessor);

    return (
        <span className="input checkbox browser-style">
            <OptionalLabel id={id} text={label} subtext={description} />
            <input type="checkbox"
                id={id}
                checked={checked}
                onChange={async (e) => await setChecked(e.currentTarget.checked)}
                {...inputProps}
                />
        </span>
    );
};
