import { Typography } from '@material-ui/core';
import { IZTypedocFlags } from '@zthun/works.core';
import React, { ReactNode } from 'react';
import { IZTypedocFlagsViewerProps } from './typedoc-flags-viewer.props';

/**
 * Renders the view for typedoc flags.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for rendering the flags.
 */
export function ZTypedocFlagsViewer(props: IZTypedocFlagsViewerProps) {
  /**
   * Creates the jsx for a flag.
   *
   * @param text The text of the flag.
   * @param color The flag color.
   *
   * @returns The jsx for the flag.
   */
  function createFlag(text: string) {
    const id = text.toLowerCase();
    const clasz = `ZTypedocFlagsViewer-flag-${id}`;

    return (
      <Typography key={id} className={`ZTypedocFlagsViewer-flag ${clasz}`} data-testid={clasz} variant='body2' component='span'>
        {text}
      </Typography>
    );
  }

  const flags: IZTypedocFlags = props.flags || {};
  const buttons: ReactNode[] = [];

  if (flags.isAbstract) {
    buttons.push(createFlag('Abstract'));
  }

  if (flags.isConst) {
    buttons.push(createFlag('Const'));
  }

  if (flags.isStatic) {
    buttons.push(createFlag('Static'));
  }

  if (flags.isReadonly) {
    buttons.push(createFlag('Readonly'));
  }

  if (flags.isProtected) {
    buttons.push(createFlag('Protected'));
  }

  if (flags.isPrivate) {
    buttons.push(createFlag('Private'));
  }

  if (flags.isRest) {
    buttons.push(createFlag('Rest'));
  }

  if (flags.isOptional) {
    buttons.push(createFlag('Optional'));
  }

  return buttons.length ? <div className='ZTypedocFlagsViewer-root'>{buttons}</div> : null;
}
