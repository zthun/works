import { Menu } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React, { useEffect, useRef } from 'react';
import { IZButton, ZButton } from '../buttons/button';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { usePropState } from '../state/use-prop-state';
import { useSafeState } from '../state/use-safe-state';
import { makeStyles } from '../theme/make-styles';
import { ZMenuEvent } from './menu-event';

export interface IZMenu extends IZComponentHierarchy, Omit<IZButton, 'onClick'> {
  open?: boolean;

  onOpen?: (open: boolean) => void;
}

interface IZMenuState {
  open: boolean | undefined;
  anchor: Element | null | undefined;
}

const useMenuStyles = makeStyles<IZMenuState>()((theme, state) => {
  const { open, anchor } = state;
  const minWidth = anchor?.clientWidth;

  return {
    button: {
      '::after': {
        marginLeft: theme.gap(),
        content: open ? '"▲"' : '"▼"'
      }
    },
    menu: {
      'ul.MuiMenu-list': {
        minWidth
      }
    }
  };
});

/**
 * Represents a button menu with a dropdown.
 *
 * @param props The menu properties
 *
 * @returns The JSX to render the menu component.
 */
export function ZMenu(props: IZMenu) {
  const { className, children, open, onOpen } = props;
  const [_open, _setOpen] = usePropState(open, onOpen);
  const [anchor, setAnchor] = useSafeState<Element | null | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);
  const styles = useMenuStyles({ open: _open, anchor });
  const containerClassName = cssClass('ZMenu-root', className);
  const buttonClassName = cssClass('ZMenu-toggle', styles.classes.button);
  const menuClassName = cssClass('ZMenu-item-list', styles.classes.menu);
  const toggle = _setOpen.bind(null, !_open);

  useEffect(() => {
    setAnchor(container.current?.querySelector('.ZMenu-toggle'));
  }, [container.current]);

  useEffect(() => {
    // Blah. react doesn't have a good way to handle this specific case (hell,
    // Angular didn't either).  Rather than trying to add a bunch more DOM
    // elements to the menu and then trying to intercept the click event for all
    // of them, an easier solution is here, where we just have the items raise
    // a DOM event and let it bubble up to the root, since the popup is outside
    // of the DOM tree at the body level.  When get get this event, we can just
    // simulate the user clicking on the actual backdrop to close the menu.
    // This gives us everything we need here and it's much less intensive and everything
    // has an O(1) operation.
    const close = (e: CustomEvent<HTMLElement>) => {
      const popup = e.detail.closest<HTMLElement>('.ZMenu-item-list');
      const backdrop = popup?.querySelector<HTMLElement>('.MuiBackdrop-root');
      backdrop?.click();
    };

    window.addEventListener(ZMenuEvent.ItemClick, close);
    return () => window.removeEventListener(ZMenuEvent.ItemClick, close);
  }, []);

  /**
   * Renders the menu.
   *
   * @returns The JSX that represents the menu.
   */
  function renderMenu() {
    if (!anchor) {
      return null;
    }

    return (
      <Menu className={menuClassName} anchorEl={anchor} open={!!_open} onClose={_setOpen.bind(null, false)}>
        {children}
      </Menu>
    );
  }

  return (
    <div className={containerClassName} ref={container}>
      <ZButton {...props} className={buttonClassName} onClick={toggle.bind(null)} />
      {renderMenu()}
    </div>
  );
}
