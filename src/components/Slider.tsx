import * as React from 'react';

import { BaseNumber, BaseNumberProps} from './BaseNumber';

export interface SliderProps extends BaseNumberProps {
}

/**
 * Number field with a slider.
 */
export const Slider: React.FunctionComponent<SliderProps> = (props) => {
    return <BaseNumber type="range" {...props} />;
}

export default Slider;
