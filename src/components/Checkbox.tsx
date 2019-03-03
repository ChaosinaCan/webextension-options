import * as React from 'react';
import { IStorageAccessor } from '@spadin/webextension-storage';

import { inputId, useStore } from './Utils';
import { OptionalLabel } from './OptionalLabel';

export interface CheckboxProps {
    accessor: IStorageAccessor<boolean>;
    label?: string;
    description?: string;
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => {
    const [checked, setChecked] = useStore(props.accessor, false);
    const id = inputId(props.accessor);

    return (
        <span className="input checkbox browser-style">
            <OptionalLabel id={id} text={props.label} subtext={props.description} />
            <input type="checkbox"
                id={id}
                checked={checked}
                onChange={async (e) => await setChecked(e.currentTarget.checked)}
                />
        </span>
    );
}
