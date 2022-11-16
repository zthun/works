import { TextField } from '@mui/material';
import { createSizeChartFixedArithmetic, ZSizeFixed } from '@zthun/works.chonkify';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { IZText, useText } from './text';

export interface IZTextArea extends IZText, IZComponentHeight<ZSizeFixed> {}

const TextAreaRows = createSizeChartFixedArithmetic(2, 2);

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
  const { className, name, required, height = ZSizeFixed.Medium } = props;
  const clasz = cssClass('ZText-root', 'ZText-area', className);
  const _textField = useText(props, '');
  const rows = TextAreaRows[height];

  return (
    <TextField {..._textField} className={clasz} multiline rows={rows} data-name={name} data-required={required} />
  );
}
