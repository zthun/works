import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZButton, ZButton } from '../buttons/button';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { useSafeState } from '../state/use-safe-state';
import { IZPopup, ZPopup, ZPopupPosition } from './popup';

/**
 * Represents properties for a pop button component.
 */
export interface IZPopupButton extends IZComponentHierarchy, IZComponentStyle {
  /**
   * The properties for the underlying button component.
   */
  ButtonProps?: Omit<IZButton, 'onClick'>;
  /**
   * The properties for the underlying popup component
   */
  PopupProps?: Omit<IZPopup, 'attach' | 'children'>;
}

/**
 * Renders a button that drops pop content.
 *
 * @param props
 *        The properties for this button menu.
 *
 * @returns
 *        The JSX to render the button menu.
 */
export function ZPopupButton(props: IZPopupButton) {
  const { ButtonProps, PopupProps, children, className } = props;
  const [attach, setAttach] = useSafeState<ZPopupPosition>(null);

  return (
    <div className={cssClass('ZPopupButton-root', className)}>
      <ZButton {...ButtonProps} onClick={(e) => setAttach(e.currentTarget)} />
      <ZPopup {...PopupProps} attach={attach} onClose={setAttach.bind(null, null)}>
        {children}
      </ZPopup>
    </div>
  );
}
