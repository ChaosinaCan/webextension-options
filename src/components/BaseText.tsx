import * as React from 'react';

import { IStorageAccessor } from '@spadin/webextension-storage';

import { OptionalLabel } from './OptionalLabel';
import { inputId, useStore } from './Utils';

export interface BaseTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Accessor for the setting to bind to. */
    accessor: IStorageAccessor<string>;
    /** Text label for the input field. */
    label?: string;
    /** Secondary text with a more detailed description of the setting. */
    description?: string;
}

/**
 * Generic text input field
 */
export const BaseText: React.FunctionComponent<BaseTextProps> = (props) => {
    const {type, accessor, label, description, ...inputProps} = props;

    const [value, setValue] = useStore(accessor, '');
    const id = inputId(accessor);

    return (
        <span className="input text browser-style">
            <OptionalLabel id={id} text={label} subtext={description} />
            <input type={type}
                id={id}
                value={value}
                onChange={async (e) => await setValue(e.currentTarget.value)}
                {...inputProps}
                />
        </span>
    );
};

export default BaseText;
