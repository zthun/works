import { TextField } from '@mui/material';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { IZText, useText } from './text';
export interface IZTextArea extends IZText, IZComponentHeight<ZSizeFixed> {}

/**
 * Represents a text input that supports multiline.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZTextArea(props: IZTextArea) {
  const { className, name, required } = props;
  const clasz = cssClass('ZText-root', 'ZText-area', className);
  const _textField = useText(props, '');
  return <TextField {..._textField} multiline className={clasz} data-name={name} data-required={required} />;
}
