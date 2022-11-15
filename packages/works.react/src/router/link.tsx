import { Link } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { noop } from 'lodash';
import React from 'react';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';

/**
 * Represents a link component (anchor tag).
 */
export interface IZLink extends IZComponentStyle, IZComponentName, IZComponentLabel {
  /**
   * The link url.
   */
  href?: string;

  /**
   * Occurs when the link is clicked.
   *
   * @param href
   *        The reference that is being navigated to.  This is mostly for
   *        convenience.
   */
  onClick?(href: string): void;
}

/**
 * Basically a wrapper for an anchor tag in the browser.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZLink(props: IZLink) {
  const { className, name, href, label, onClick = noop } = props;
  const clasz = cssClass('ZLink-root', className);

  const handleClick = () => {
    onClick(href);
  };

  return (
    <Link className={clasz} href={href} data-name={name} onClick={handleClick}>
      {label}
    </Link>
  );
}
