import * as React from 'react';

interface SettingsSectionProps {
    /** Header text to display above the section. */
    title: string;

    className?: string;
}

/**
 * Container for multiple, related settings.
 */
export const SettingsSection: React.FunctionComponent<SettingsSectionProps> = (props) => {
    return (
        <section className={props.className}>
            <h2>{props.title}</h2>
            <div className="card">
                {props.children}
            </div>
        </section>
    );
}