import * as React from 'react';

import { BaseText, BaseTextProps } from './BaseText';

export type TextBoxProps = BaseTextProps;

/**
 * Single-line text input field.
 */
export const TextBox: React.FunctionComponent<TextBoxProps> = (props) => {
    return <BaseText type="text" {...props} />;
};

export default TextBox;
