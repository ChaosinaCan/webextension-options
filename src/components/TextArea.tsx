import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IStorageAccessor } from '@spadin/webextension-storage';

import { inputId, useStore } from './Utils';
import { OptionalLabel } from './OptionalLabel';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    accessor: IStorageAccessor<string>;
    label?: string;
    description?: string;
}

export const TextArea: React.FunctionComponent<TextAreaProps> = (props) => {
    const { accessor, label, description, ...textAreaProps } = props;

    const [value, setValue] = useStore(accessor, '');
    const id = inputId(accessor);

    function removeConflictingProps() {
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
}

export default TextArea;
