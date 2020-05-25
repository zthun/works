import { Button, Menu, MenuItem } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { useMenuState } from '../common/use-menu-state.hook';
import { IZProfileMenuProps } from './profile-menu.props';

/**
 * Represents the menu that either displays the login text or the user's display or email.
 *
 * @param props The properties for the menu.
 */
export function ZProfileMenu(props: IZProfileMenuProps) {
  const [anchorEl, openMenu, closeMenu] = useMenuState();

  function createLoginButton() {
    return (
      <Button className='ZProfileMenu-btn-login' data-testid='ZProfileMenu-btn-login' color='inherit' onClick={props.onLogin}>
        LOGIN
      </Button>
    );
  }

  function createLogoutMenuItem() {
    return (
      <MenuItem className='ZProfileMenu-menuitem-logout' data-testid='ZProfileMenu-menuitem-logout' onClick={props.onLogout}>
        LOGOUT
      </MenuItem>
    );
  }

  function createProfileMenu() {
    const logout = props.hideLogout ? null : createLogoutMenuItem();

    return (
      <React.Fragment>
        <Button className='ZProfileMenu-btn-profile' data-testid='ZProfileMenu-btn-profile' color='inherit' onClick={openMenu}>
          {props.profile.display || props.profile.email}
        </Button>
        <Menu className='ZProfileManu-menu-profile' data-testid='ZProfileMenu-menu-profile' open={!!anchorEl} onClose={closeMenu} anchorEl={anchorEl} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <div onClick={closeMenu}>
            {props.children}
            {logout}
          </div>
        </Menu>
      </React.Fragment>
    );
  }

  const ui = props.profile ? createProfileMenu() : createLoginButton();

  return (
    <div className='ZProfileMenu-root' data-testid='ZProfileMenu-root'>
      {ui}
    </div>
  );
}

ZProfileMenu.defaultProps = {
  hideLogout: false,

  profile: null,

  onLogin: noop,
  onLogout: noop
};
