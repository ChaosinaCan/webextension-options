import * as React from 'react';
import { IStorageAccessor } from '@spadin/webextension-storage';

import { inputId, useStore } from './Utils';
import { OptionalLabel } from './OptionalLabel';

export interface BaseTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // type: 'search' | 'tel' | 'text' | 'url';
    accessor: IStorageAccessor<string>;
    label?: string;
    description?: string;
}

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
}

export default BaseText;
