import * as React from 'react';
import { IStorageAccessor } from '@spadin/webextension-storage';
import { RadioGroup as ReactRadioGroup, Radio as ReactRadio } from 'react-radio-group';

import { inputId, useStore } from './Utils';

export interface RadioProps {
    value: string;
}

export const Radio: React.FunctionComponent<RadioProps> = (props) => {
    return (
        <label className="browser-style">
            <ReactRadio value={props.value} />
            {props.children}
        </label>
    )
}

export interface RadioGroupProps {
    accessor: IStorageAccessor<string>;
    legend?: string;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = (props) => {
    const [value, setValue] = useStore(props.accessor, '');
    const id = inputId(props.accessor);

    return (
        <fieldset className="radio-group">
            {props.legend &&
                <legend>{props.legend}</legend>
            }
            <ReactRadioGroup
                name={id}
                selectedValue={value}
                onChange={setValue}
                >
                {props.children}
            </ReactRadioGroup>
        </fieldset>
    )
}
