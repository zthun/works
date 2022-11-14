import { Popover } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';

/**
 * Represents an origin point for a popup.
 */
export interface IZPopupAnchorOrigin {
  /**
   * Horizontal origin.
   */
  horizontal?: 'left' | 'right' | 'center';

  /**
   * Vertical origin.
   */
  vertical?: 'top' | 'bottom' | 'center';
}

/**
 * A position of where the popup is opened.
 */
export type ZPopupPosition = Element | null;

/**
 * Represents props for a popup component.
 */
export interface IZPopup extends IZComponentHierarchy, IZComponentStyle {
  /**
   * The position the popup is attached to.
   *
   * If this is falsy, then the popup is closed.
   */
  attach?: ZPopupPosition;

  /**
   * The callback for when the popup requests to be closed.
   */
  onClose?(): void;

  /**
   * The origin point at which to popup opens relative to the
   * popup position.
   *
   * If the attach is an element, this is the origin on that element. If it is
   * a point, then this is ignored and it is opened at that point.
   */
  attachOrigin?: IZPopupAnchorOrigin;

  /**
   * The origin of the popup relative to the attach point or attachOrigin.
   *
   * This is the point that is referenced on the popup which is consistent every
   * time it is opened, regardless of the popup content.
   */
  popupOrigin?: IZPopupAnchorOrigin;
}

/**
 * Represents a popup that houses content.
 *
 * @param props
 *        The properties for the popup.
 *
 * @returns
 *        The JSX to render the popup content.
 */
export function ZPopup(props: IZPopup) {
  const { className, children, attach, attachOrigin = {}, popupOrigin = {}, onClose } = props;
  const { vertical: attachVertical = 'bottom', horizontal: attachHorizontal = 'left' } = attachOrigin;
  const { vertical: popupVertical = 'top', horizontal: popupHorizontal = 'left' } = popupOrigin;

  return (
    <Popover
      className={cssClass('ZPopup-root', className)}
      anchorEl={attach}
      open={!!attach}
      onClose={onClose}
      anchorOrigin={{ vertical: attachVertical, horizontal: attachHorizontal }}
      transformOrigin={{ vertical: popupVertical, horizontal: popupHorizontal }}
    >
      <div className='ZPopup-content'>{children}</div>
    </Popover>
  );
}
