import { InputLabel, Slider } from '@mui/material';
import { cssClass, firstDefined } from '@zthun/works.core';
import { castArray, first } from 'lodash';
import React from 'react';
import { useAmbassadorState } from '../state/use-ambassador-state';
import { IZNumber } from './number';

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
  const clasz = cssClass('ZNumber-root', 'ZNumber-slider', className);

  const handleCommit = (_: any, value: number | number[]) => {
    const _next = firstDefined(min, first(castArray(value)));
    _setValue(_next);
  };

  const renderLabel = () => {
    return label ? <InputLabel className='ZNumber-label'>{label}</InputLabel> : null;
  };

  return (
    <div className={clasz} data-name={name}>
      {renderLabel()}
      <Slider disabled={disabled} value={_value} min={min} max={max} name={name} step={step} onChange={handleCommit} />
    </div>
  );
}
