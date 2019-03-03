import * as React from 'react';

import { BaseNumber, BaseNumberProps } from './BaseNumber';

export interface NumberProps extends BaseNumberProps {
}

export class Number extends React.Component<NumberProps> {
    constructor(props: Readonly<NumberProps>) {
        super(props);
    }

    render() {
        return (
            <BaseNumber type="number" {...this.props} />
        );
    }
}

export default Number;
