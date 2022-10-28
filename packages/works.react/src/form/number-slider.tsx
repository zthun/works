import { InputLabel, Slider, SliderThumb } from '@mui/material';
import {
  createSizeChartFixedCss,
  createSizeChartFixedLinear,
  createSizeChartVariedCss,
  cssClass,
  firstDefined,
  ZSizeVaried
} from '@zthun/works.core';
import { castArray, first } from 'lodash';
import React from 'react';
import { useAmbassadorState } from '../state/use-ambassador-state';
import { makeStyles } from '../theme/make-styles';
import { IZNumber } from './number';

const NumberSliderSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedLinear(4, 0, 2), 'rem'),
  ...createSizeChartVariedCss()
};

const useNumberSliderStyles = makeStyles<IZNumber>()((_, props) => {
  const { width = ZSizeVaried.Full } = props;
  const _width = NumberSliderSizeChart[width];

  return {
    slider: {
      width: _width
    }
  };
});

/**
 * The underlying spinner.
 *
 * @param props
 *        The properties to the spinner.
 *
 * @returns
 *        The JSX to render the spinner.
 */
function _ZNumberSliderSpinner(props: any) {
  const className = props.className;
  const clasz = cssClass('ZNumber-spinner', className);
  return <SliderThumb {...props} className={clasz} />;
}

/**
 * Represents a slider component.
 *
 * @param props
 *        The properties to this component.
 *
 * @returns
 *        The JSX that renders the component.
 */
export function ZNumberSlider(props: IZNumber) {
  const { className, disabled, min = 0, max = 100, step = 1, name, label, value, onValueChange } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, min);
  const { classes } = useNumberSliderStyles(props);
  const clasz = cssClass('ZNumber-root', 'ZNumber-slider', className);

  const handleCommit = (_: any, value: number | number[]) => {
    const _next = firstDefined(min, first(castArray(value)));
    _setValue(_next);
  };

  const renderLabel = () => {
    return label ? <InputLabel className='ZNumber-label'>{label}</InputLabel> : null;
  };

  return (
    <div className={clasz}>
      {renderLabel()}
      <Slider
        className={classes.slider}
        disabled={disabled}
        value={_value}
        min={min}
        max={max}
        name={name}
        step={step}
        components={{ Thumb: _ZNumberSliderSpinner }}
        onChange={handleCommit}
      />
    </div>
  );
}
