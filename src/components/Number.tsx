import * as React from 'react';

import { BaseNumber, BaseNumberProps } from './BaseNumber';

export type NumberProps = BaseNumberProps;

/**
 * Number field with text input and up/down buttons.
 */
// tslint:disable-next-line: variable-name
export const Number: React.FunctionComponent<NumberProps> = (props) => {
    return (
        <BaseNumber type="number" {...props} />
    );
};

export default Number;
