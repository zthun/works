import PersonIcon from '@mui/icons-material/Person';
import { isStateLoaded, isStateLoading } from '@zthun/helpful-react';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { cssClass, ZProfileAvatarSize } from '@zthun/works.core';
import md5 from 'md5';
import React from 'react';
import { useOptionalWebApp } from '../apps/web-app-service';
import { IZButton, ZButton } from '../buttons/button';
import { makeStyles } from '../theme/make-styles';
import { useWindowService } from '../window/window-service';
import { useIdentity } from './identity-service';

/**
 * Represents properties for the profile button.
 */
export interface IZIdentityButtonProps {
  /**
   * The properties for the inner button.
   */
  ButtonProps?: Omit<IZButton, 'avatar' | 'loading' | 'label' | 'onClick'>;

  /**
   * The application to navigate to when the profile button is clicked.
   *
   * If this is falsy, then no navigation occurs.
   */
  profileApp?: string | null;
}

const useIdentityButtonStyles = makeStyles()((theme) => ({
  avatar: {
    height: '3rem',
    width: '3rem',
    borderRadius: '50%',
    border: `${theme.thickness()} solid ${theme.palette.grey[400]}`,
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
  const { ButtonProps, profileApp } = props;
  const [profile] = useIdentity();
  const [app] = useOptionalWebApp(profileApp);
  const win = useWindowService();
  const { classes } = useIdentityButtonStyles();
  const authenticated = !!(isStateLoaded(profile) && profile);

  const handleProfile = () => {
    if (!isStateLoaded(profile) || !isStateLoaded(app) || app == null) {
      return;
    }

    win.open(app.domain, '_self');
  };

  const renderLabel = () => {
    if (!isStateLoaded(profile)) {
      return null;
    }

    if (profile == null) {
      return <>LOGIN</>;
    }

    const display = profile?.display;
    const email = profile?.email;
    return display || email;
  };

  const renderAvatar = () => {
    if (!isStateLoaded(profile)) {
      return null;
    }

    if (profile == null) {
      return <PersonIcon />;
    }

    const clasz = cssClass('ZIdentityButton-avatar', classes.avatar);

    const email = profile.email;
    const avatar = profile.avatar || new ZUrlBuilder().gravatar(email ? md5(email) : '', ZProfileAvatarSize).build();

    return <img className={clasz} src={avatar} />;
  };

  return (
    <div className='ZIdentityButton-root' data-authenticated={authenticated}>
      <ZButton
        {...ButtonProps}
        avatar={renderAvatar()}
        label={renderLabel()}
        loading={isStateLoading(profile)}
        onClick={handleProfile}
      />
    </div>
  );
}
