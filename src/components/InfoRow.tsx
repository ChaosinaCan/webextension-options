import * as React from 'react';

interface InfoRowProps {
    className?: string;
}

export const InfoRow: React.FunctionComponent<InfoRowProps> = (props) => {
    return (
        <div className={`settings-row info-row ${props.className || ''}`}>
            {props.children}
        </div>
    );
}