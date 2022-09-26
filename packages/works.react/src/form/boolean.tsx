import React, { ReactNode } from 'react';

import { Checkbox, FormControlLabel, Radio, Switch } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { IZComponentValue } from '../component/component-value';
import { usePropState } from '../state/use-prop-state';
import { makeStyles } from '../theme/make-styles';

export type ZBooleanStyle = 'checkbox' | 'radio' | 'inline-radio' | 'switch';

const useBooleanStyles = makeStyles()(() => {
  return {
    radio: {
      display: 'block !important'
    }
  };
});

export interface IZBoolean extends IZComponentDisabled, IZComponentValue<boolean | null>, IZComponentStyle {
  type?: ZBooleanStyle;

  truthy?: ReactNode;
  falsy?: ReactNode;
}

/**
 * Represents a basic checkbox style component.
 *
 * @param props The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZBoolean(props: IZBoolean) {
  const { className, disabled, type = 'checkbox', truthy, falsy, value, onValueChange } = props;
  const [_value, _setValue] = usePropState(value, onValueChange);
  const booleanClass = cssClass('ZBoolean-root', className);
  const styles = useBooleanStyles();

  /**
   * Renders the radio type.
   *
   * @param row
   *        True to make the radio inline.
   * @returns
   *        The JSX for the radio type.
   */
  function renderRadio(row: boolean) {
    const isTrue = _value === true;
    const isFalse = _value === false;
    const truthyClass = cssClass('ZBoolean-radio-truthy', row ? undefined : styles.classes.radio);
    const falsyClass = cssClass('ZBoolean-radio-falsy', row ? undefined : styles.classes.radio);

    const setIfChecked = (value: boolean, _: any, checked: boolean) => {
      if (checked) {
        _setValue(value);
      }
    };

    return (
      <div className={`ZBoolean-${type}`}>
        <FormControlLabel className={truthyClass} control={<Radio disabled={disabled} checked={isTrue} onChange={setIfChecked.bind(null, true)} />} label={truthy} />
        <FormControlLabel className={falsyClass} control={<Radio disabled={disabled} checked={isFalse} onChange={setIfChecked.bind(null, false)} />} label={falsy} />
      </div>
    );
  }

  /**
   * Renders the switch type.
   *
   * @returns
   *        The JSX for the switch type.
   */
  function renderSwitch() {
    const checked = !!_value;
    return <FormControlLabel className='ZBoolean-switch' control={<Switch disabled={disabled} checked={checked} onChange={(_, checked) => _setValue(checked)} />} label={truthy} />;
  }

  /**
   * Renders the checkbox type.
   *
   * @returns The JSX for the checkbox type.
   */
  function renderCheckbox() {
    const checked = _value == null ? false : _value;
    const indeterminate = _value === null;
    return <FormControlLabel className='ZBoolean-checkbox' control={<Checkbox disabled={disabled} checked={checked} indeterminate={indeterminate} onChange={(_, checked) => _setValue(checked)} />} label={truthy} />;
  }

  const renderBoolean: Record<ZBooleanStyle, () => ReactNode> = {
    'checkbox': renderCheckbox,
    'radio': renderRadio.bind(null, false),
    'inline-radio': renderRadio.bind(null, true),
    'switch': renderSwitch
  };

  return (
    <div className={booleanClass} data-type={type}>
      {renderBoolean[type]()}
    </div>
  );
}
