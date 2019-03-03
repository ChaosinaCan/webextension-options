import * as React from 'react';

export interface ExpandProps {
    isOpen: boolean;
}

export const Expand: React.FunctionComponent<ExpandProps> = (props) => {
    const style = props.isOpen ? undefined : { display: 'none' };

    return (
        <div className='expand' style={style}>
            {props.children}
        </div>
    )
}
