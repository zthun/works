import PersonIcon from '@mui/icons-material/Person';
import { Button, Grid, Hidden, Typography } from '@mui/material';
import { IZProfile } from '@zthun/works.core';
import { ZUrlBuilder } from '@zthun/works.url';
import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { ZCircularProgress } from '../loading/circular-progress';
import { makeStyles } from '../theme/make-styles';
import { useIdentityService } from './identity-service.context';

/**
 * Represents properties for the profile button.
 */
export interface IZIdentityButtonProps extends IZComponentDisabled {
  /**
   * The current profile being displayed.
   *
   * If this is undefined, then the loading indicator is shown.
   * If this is null, then the Login button is shown.
   * If this is truthy, then the profile display and avatar is shown.
   */
  profile: IZProfile;

  /**
   * Occurs when the button is clicked when the Login button is displayed.
   */
  onLogin?: () => void;

  /**
   * Occurs when the button is clicked when the profile information is displayed.
   */
  onProfile?: () => void;
}

const useIdentityButtonStyles = makeStyles()((theme) => ({
  avatar: {
    height: theme.sizing.avatar.sm,
    width: theme.sizing.avatar.sm,
    borderRadius: theme.rounding.circle,
    border: `${theme.sizing.thickness.xs} solid ${theme.palette.grey[400]}`,
    background: theme.palette.common.white
  }
}));

/**
 * Represents a tri-state button that displays the profile information based on 3 possible states.
 *
 * @param props The properties for the menu.
 *
 * @returns The jsx that renders the profile menu.
 */
export function ZIdentityButton(props: IZIdentityButtonProps) {
  const {
    profile,
    disabled = false,

    onLogin = noop,
    onProfile = noop
  } = props;

  const profiles = useIdentityService();
  const [avatar, setAvatar] = useState(new ZUrlBuilder().gravatar().build());
  const [display, setDisplay] = useState('');
  const styles = useIdentityButtonStyles();

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
      <Button className='ZIdentityButton-root ZIdentityButton-login' color='inherit' disabled={disabled} onClick={onLogin}>
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
    return <ZCircularProgress className='ZIdentityButton-root ZIdentityButton-loading' />;
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
      <Button className='ZIdentityButton-root ZIdentityButton-profile' color='inherit' onClick={onProfile} disabled={disabled}>
        <Grid container spacing={2} justifyContent='center' alignItems='center' wrap='nowrap'>
          <Grid item>
            <img className={`ZIdentityButton-avatar ${styles.classes.avatar}`} src={avatar} />
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