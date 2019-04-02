import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { IStorageAccessor } from '@spadin/webextension-storage';

import { OptionalLabel } from './OptionalLabel';
import { inputId, useStore } from './Utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Accessor for the setting to bind to. */
    accessor: IStorageAccessor<string>;
    /** Text label for the input field. */
    label?: string;
    /** Secondary text with a more detailed description of the setting. */
    description?: string;
}

/**
 * Multi-line text input field.
 */
export const TextArea: React.FunctionComponent<TextAreaProps> = (props) => {
    const { accessor, label, description, ...textAreaProps } = props;

    const [value, setValue] = useStore(accessor, '');
    const id = inputId(accessor);

    function removeConflictingProps() {
        // tslint:disable-next-line: no-shadowed-variable
        const { value, ...props } = textAreaProps;
        return props;
    }

    return (
        <span className="input textarea browser-style">
            <OptionalLabel id={id} text={label} subtext={description} />
            <TextareaAutosize
                id={id}
                value={value}
                onChange={async (e) => await setValue(e.currentTarget.value)}
                {...removeConflictingProps()}
                />
        </span>
    );
};

export default TextArea;
