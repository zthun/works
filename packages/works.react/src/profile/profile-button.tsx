import { Button, Grid, Hidden, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { noop } from 'lodash';
import React from 'react';
import { ZCircularProgress } from '../loading/circular-progress';
import { IZProfileButtonProps } from './profile-button.props';
import { getProfileAvatarUrl, getProfileDisplay } from './profile-service';

/**
 * Represents a tri-state button that displays the profile information based on 3 possible states.
 *
 * @param props The properties for the menu.
 *
 * @returns The jsx that renders the profile menu.
 */
export function ZProfileButton(props: IZProfileButtonProps) {
  /**
   * Creates the root button as a login button jsx.
   *
   * This should be used when the user is not logged in.
   *
   * @returns The jsx for the menu with a single login button.
   */
  function createLoginButton() {
    return (
      <Button className='ZProfileButton-root ZProfileButton-login' data-testid='ZProfileButton-login' color='inherit' disabled={props.disabled} onClick={props.onLogin}>
        <PersonIcon />
        <Hidden only='xs'>
          <Typography>LOGIN</Typography>
        </Hidden>
      </Button>
    );
  }

  /**
   * Creates the profile loading spinner.
   *
   * This should be used when the profile is undefined and loading.
   *
   * @returns The profile loading item jsx.
   */
  function createProfileLoading() {
    return <ZCircularProgress className='ZProfileButton-root ZProfileButton-loading' data-testid='ZProfileButton-loading' />;
  }

  /**
   * Creates the profile button jsx.
   *
   * This should be used if the user is logged in.
   *
   * @returns The profile menu jsx.
   */
  function createProfileButton() {
    return (
      <Button className='ZProfileButton-root ZProfileButton-profile' data-testid='ZProfileButton-profile' color='inherit' onClick={props.onProfile} disabled={props.disabled}>
        <Grid container spacing={2} justify='center' alignItems='center' wrap='nowrap'>
          <Grid item>
            <img className='ZProfileButton-avatar' data-testid='ZProfileButton-avatar' src={getProfileAvatarUrl(props.profile)} />
          </Grid>
          <Hidden only='xs'>
            <Grid item>{getProfileDisplay(props.profile)}</Grid>
          </Hidden>
        </Grid>
      </Button>
    );
  }

  return props.profile ? createProfileButton() : props.profile === undefined ? createProfileLoading() : createLoginButton();
}

ZProfileButton.defaultProps = {
  disabled: false,
  onLogin: noop,
  onProfile: noop
};
