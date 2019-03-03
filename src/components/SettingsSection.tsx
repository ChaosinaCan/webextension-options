import * as React from 'react';

interface SettingsSectionProps {
    title: string;

    className?: string;
}

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