import * as React from 'react';

export interface OptionalLabelProps {
    /** ID of the input that this element labels. */
    id: string;
    /** Label text. */
    text?: string;
    /** Secondary text to display under the label. */
    subtext?: string;
}

/**
 * Label for an input field that only renders if `props.text` is defined.
 */
export const OptionalLabel: React.FunctionComponent<OptionalLabelProps> = (props) => {
    if (props.text === undefined) {
        return null;
    }

    return (
        <label htmlFor={props.id}>
            {props.text}
            {props.subtext &&
                <span className="secondary">{props.subtext}</span>
            }
        </label>
    );
};
