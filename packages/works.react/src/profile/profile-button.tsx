import { Button, Grid, Hidden, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ZUrlBuilder } from '@zthun/works.url';
import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ZCircularProgress } from '../loading/circular-progress';
import { IZProfileButtonProps } from './profile-button.props';
import { useProfileService } from './profile-service.context';

/**
 * Represents a tri-state button that displays the profile information based on 3 possible states.
 *
 * @param props The properties for the menu.
 *
 * @returns The jsx that renders the profile menu.
 */
export function ZProfileButton(props: IZProfileButtonProps) {
  const {
    profile,
    disabled = false,

    onLogin = noop,
    onProfile = noop
  } = props;

  const profiles = useProfileService();
  const [avatar, setAvatar] = useState(new ZUrlBuilder().gravatar().build());
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let _setAvatar = setAvatar;
    let _setDisplay = setDisplay;

    profiles.getAvatar(profile).then((a) => _setAvatar(a));
    profiles.getDisplay(profile).then((d) => _setDisplay(d));

    return () => {
      _setAvatar = noop;
      _setDisplay = noop;
    };
  }, [profile]);

  /**
   * Creates the root button as a login button jsx.
   *
   * This should be used when the user is not logged in.
   *
   * @returns The jsx for the menu with a single login button.
   */
  function createLoginButton() {
    return (
      <Button className='ZProfileButton-root ZProfileButton-login' data-testid='ZProfileButton-login' color='inherit' disabled={disabled} onClick={onLogin}>
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
      <Button className='ZProfileButton-root ZProfileButton-profile' data-testid='ZProfileButton-profile' color='inherit' onClick={onProfile} disabled={disabled}>
        <Grid container spacing={2} justifyContent='center' alignItems='center' wrap='nowrap'>
          <Grid item>
            <img className='ZProfileButton-avatar' data-testid='ZProfileButton-avatar' src={avatar} />
          </Grid>
          <Hidden only='xs'>
            <Grid item>{display}</Grid>
          </Hidden>
        </Grid>
      </Button>
    );
  }

  return profile ? createProfileButton() : profile === undefined ? createProfileLoading() : createLoginButton();
}
