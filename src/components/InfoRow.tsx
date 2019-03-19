import * as React from 'react';

export interface InfoRowProps {
    className?: string;
}

/**
 * Row that displays text or other information instead of a setting.
 */
export const InfoRow: React.FunctionComponent<InfoRowProps> = (props) => {
    return (
        <div className={`settings-row info-row ${props.className || ''}`}>
            {props.children}
        </div>
    );
}

export default InfoRow;
