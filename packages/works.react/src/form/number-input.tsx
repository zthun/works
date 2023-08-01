import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { TextField } from '@mui/material';
import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import { useAmbassadorState } from '@zthun/helpful-react';
import { cssClass } from '@zthun/works.core';
import React, { KeyboardEvent } from 'react';
import { makeStyles } from '../theme/make-styles';
import { IZNumber } from './number';
import { IZText, useText, withEnterCommit } from './text';

export const useNumberInputStyles = makeStyles()(() => {
  return {
    spinner: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center'
    },

    spin: {
      width: '1.5rem',
      height: '1.5rem',
      padding: 0,
      margin: 0,
      fontSize: 'inherit',
      border: 0,

      svg: {
        width: '100%',
        height: '100%'
      }
    },

    up: {
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%'
    },

    down: {
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%'
    }
  };
});

/**
 * Represents an input that takes a number value.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX responsible for rendering this input.
 */
export function ZNumberInput(props: IZNumber<number | null>) {
  const { className, step = 1, min = -Infinity, max = Infinity, name, value, onValueChange } = props;
  const clasz = cssClass('ZNumber-root', 'ZNumber-input', className);
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, null);
  const { classes } = useNumberInputStyles();
  const __value = _value != null ? String(_value) : '';

  const handleCommit = (update: string) => {
    _setValue(update?.trim() === '' ? null : +update);
  };

  const handleSpin = (direction: 1 | -1) => {
    let current = Number.isNaN(_value) ? 0 : _value;
    current = current || 0;
    let next = current + direction * step;
    next = Math.max(next, min);
    next = Math.min(next, max);
    _setValue(next);
  };

  const handleSpinOnEnter = (direction: 1 | -1, e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === ZCircusKeyboardQwerty.enter.code) {
      e.stopPropagation();
    }
  };

  const adornment = (
    <div className={cssClass('ZNumber-spinner', classes.spinner)}>
      <button
        className={cssClass('ZNumber-spinner-increment', classes.spin, classes.up)}
        onClick={handleSpin.bind(null, 1)}
        onKeyDown={handleSpinOnEnter.bind(null, 1)}
      >
        <ArrowDropUpIcon fontSize='inherit' />
      </button>
      <button
        className={cssClass('ZNumber-spinner-decrement', classes.spin, classes.down)}
        onClick={handleSpin.bind(null, -1)}
        onKeyDown={handleSpinOnEnter.bind(null, -1)}
      >
        <ArrowDropDownIcon fontSize='inherit' />
      </button>
    </div>
  );

  const _propsForText: IZText = { ...props, value: __value, onValueChange: handleCommit, suffix: adornment };
  const _text = useText<string>(_propsForText, '');

  const handleKeyDown = withEnterCommit(_propsForText, (e: KeyboardEvent) => {
    if (e.code === ZCircusKeyboardQwerty.upArrow.code) {
      e.preventDefault();
      handleSpin(1);
    }

    if (e.code === ZCircusKeyboardQwerty.downArrow.code) {
      e.preventDefault();
      handleSpin(-1);
    }
  });

  return (
    <TextField
      {..._text}
      className={clasz}
      onKeyDown={handleKeyDown}
      inputProps={{ min, max, step }}
      data-name={name}
    />
  );
}
