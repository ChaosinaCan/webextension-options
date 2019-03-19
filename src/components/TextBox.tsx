import * as React from 'react';

import { BaseText, BaseTextProps } from './BaseText';

export interface TextBoxProps extends BaseTextProps {
}

/**
 * Single-line text input field.
 */
export const TextBox: React.FunctionComponent<TextBoxProps> = (props) => {
    return <BaseText type="text" {...props} />
}

export default TextBox;
