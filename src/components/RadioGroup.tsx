import * as React from 'react';
import { IStorageAccessor } from '@spadin/webextension-storage';
import { RadioGroup as ReactRadioGroup, Radio as ReactRadio } from 'react-radio-group';

import { inputId, useStore } from './Utils';

export interface RadioProps {
    /** The value to apply to the setting when this radio button is selected. */
    value: string;
}

/**
 * A radio button within a `RadioGroup`.
 */
export const Radio: React.FunctionComponent<RadioProps> = (props) => {
    return (
        <label className="browser-style">
            <ReactRadio value={props.value} />
            <span>
                {props.children}
            </span>
        </label>
    )
}

export interface RadioGroupProps {
    /** Accessor for the setting to bind to. */
    accessor: IStorageAccessor<string>;
    /** If set, adds a `<legend>` to the group with the given text. */
    legend?: string;
}

/**
 * Displays a group of options, only one of which may be active at a time.
 *
 * Place two or more `Radio` elements inside a `RadioGroup` to provide the
 * options from which the user may select.
 */
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
