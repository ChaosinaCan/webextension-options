import * as React from 'react';

export interface ExpandProps {
    /** Controls whether the contents of the element are shown. */
    isOpen: boolean;

    className?: string;
}

/**
 * Container whose contents are only displayed when `props.isOpen` is true.
 */
export const Expand: React.FunctionComponent<ExpandProps> = (props) => {
    const style = props.isOpen ? undefined : { display: 'none' };

    return (
        <div className={`expand ${props.className || ''}`} style={style}>
            {props.children}
        </div>
    );
};
