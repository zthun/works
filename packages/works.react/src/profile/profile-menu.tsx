import { Button, Grid, Hidden, Menu, MenuItem } from '@material-ui/core';
import { getProfileAvatarUrl, getProfileDisplay } from '@zthun/works.core';
import { noop } from 'lodash';
import React from 'react';
import { ZCircularProgress } from '../common/circular-progress';
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
        <Button className='ZProfileMenu-btn-profile' data-testid='ZProfileMenu-btn-profile' color='inherit' onClick={openMenu} disabled={props.disabled}>
          <Grid container spacing={2} justify='center' alignItems='center' wrap='nowrap'>
            <Grid item>
              <img className='ZProfileMenu-avatar' data-testid='ZProfileMenu-avatar' src={getProfileAvatarUrl(props.profile)} />
            </Grid>
            <Hidden only='xs'>
              <Grid item>{getProfileDisplay(props.profile)}</Grid>
            </Hidden>
            <Grid item>
              <ZCircularProgress data-testid='ZProfileMenu-progress-loading' show={props.loading} />
            </Grid>
          </Grid>
        </Button>

        <Menu className='ZProfileMenu-menu-profile' data-testid='ZProfileMenu-menu-profile' open={!!anchorEl} onClose={closeMenu} anchorEl={anchorEl} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
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

  disabled: false,
  loading: false,

  onLogin: noop,
  onLogout: noop
};
