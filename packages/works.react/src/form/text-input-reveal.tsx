import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import React, { useState } from 'react';
import { ZButton } from '../buttons/button';
import { ZGridLayout } from '../layout/grid-layout';
import { ZSeverityColor } from '../theme/state-color';
import { IZText } from './text';
import { ZTextInput, ZTextType } from './text-input';

/**
 * Represents a password based input text component that can reveal the password.
 *
 * @param props
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInputReveal(props: IZText) {
  const { className, suffix } = props;
  const [revealed, setRevealed] = useState(false);
  const clasz = cssClass('ZText-input-reveal', className);
  const type = revealed ? ZTextType.Text : ZTextType.Password;
  const visible = revealed ? <VisibilityOff /> : <VisibilityOn />;
  const color = revealed ? ZSeverityColor.Warning : ZSeverityColor.Success;

  const adornment = (
    <ZGridLayout columns='auto auto' alignItems='center' gap={ZSizeFixed.Small}>
      {suffix}
      <ZButton
        className='ZText-revealer'
        color={color}
        borderless
        label={visible}
        onClick={() => setRevealed((r) => !r)}
      />
    </ZGridLayout>
  );

  return <ZTextInput {...props} className={clasz} type={type} suffix={adornment} />;
}
