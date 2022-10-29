import { TextField } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZText, useText } from './text';

/**
 * Represents a free form text component that just displays an html input.
 *
 * @param props
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInput(props: IZText) {
  const { className, name } = props;
  const clasz = cssClass('ZText-root ZText-input', className);
  const _fieldProps = useText(props);
  return <TextField {..._fieldProps} className={clasz} data-name={name} />;
}
