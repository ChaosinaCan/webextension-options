import * as React from 'react';
import { IStorageAccessor } from '@spadin/webextension-storage';

import { inputId, useStore } from './Utils';
import { OptionalLabel } from './OptionalLabel';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    accessor: IStorageAccessor<string>;
    label?: string;
    description?: string;
}

export const Select: React.FunctionComponent<SelectProps> = (props) => {
    const { accessor, label, description, ...selectProps } = props;

    const [value, setValue] = useStore(accessor, '');
    const id = inputId(accessor);

    return (
        <span className="input select browser-style">
                <OptionalLabel id={id} text={label} subtext={description} />
                <select
                    id={id}
                    value={value}
                    onChange={async (e) => await setValue(e.currentTarget.value)}
                    {...selectProps}
                    >
                    {props.children}
                </select>
            </span>
    );
}

export default Select;
