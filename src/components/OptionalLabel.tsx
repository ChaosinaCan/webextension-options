import * as React from 'react';

export interface OptionalLabelProps {
    id: string;
    text?: string;
    subtext?: string;
}

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
}


