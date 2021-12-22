import GithubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppBar, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { IZWebApp } from '@zthun/works.core';
import React, { ReactNode, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useWebApp, useWebAppsAndWatch } from '../apps/web-apps.context';
import { ZIdentityButton } from '../identity/identity-button';
import { useIdentityAndWatch } from '../identity/identity.context';
import { ZImageSource } from '../image/image-source';
import { ZCircularProgress } from '../loading/circular-progress';
import { makeStyles } from '../theme/make-styles';
import { useWindowService } from '../window/window-service.context';

/**
 * Represents properties for the top nav menu.
 */
export interface IZTopNavProps {
  /**
   * The id of the profile app.
   *
   * If you don't set this, then it will hide the profile button.
   */
  profileApp?: string;

  /**
   * The current id of the given application.
   */
  whoami: string;
}

const useTopNavStyles = makeStyles()((theme) => ({
  home: {
    height: theme.sizing.toolbar.md
  },

  title: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

  options: {
    flexGrow: 1
  },

  drawer: {
    minWidth: theme.sizing.drawer.md
  },

  icon: {
    fill: 'currentColor',
    width: theme.sizing.icon.md,
    height: theme.sizing.icon.md,
    display: 'inline-block',
    fontSize: theme.sizing.font.xl,
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
    color: `rgb(${theme.palette.common.black}, 0.54)`
  },

  avatar: {
    height: '5rem',
    marginRight: theme.sizing.gaps.sm,
    borderRadius: theme.rounding.circle,
    border: `${theme.sizing.thickness.xs} solid ${theme.palette.grey[200]}`,
    background: theme.palette.common.white
  }
}));

/**
 * Represents the top nav bar with all services implemented.
 *
 * This component is very specific and should always be at the top of an
 * application and nowhere else.
 *
 * @param props The properties to the top nav bar.
 *
 * @dependency IZWindowService - Used to navigate to different apps.
 * @dependency ZProfileContext - Used to display the current profile button.
 * @dependency ZWebAppsContext - Used to display applications in the drawer nav.
 *
 * @returns The jsx for the standard top nav.
 */
export function ZTopNav(props: IZTopNavProps) {
  const { profileApp, whoami } = props;
  const [moreShown, setMoreShown] = useState(false);
  const identity = useIdentityAndWatch();
  const apps = useWebAppsAndWatch();
  const who = useWebApp(whoami);
  const profile = useWebApp(profileApp);
  const history = useHistory();
  const win = useWindowService();
  const styles = useTopNavStyles();

  const handleOpenMore = setMoreShown.bind(null, true);
  const handleCloseMore = setMoreShown.bind(null, false);

  /**
   * Occurs when the home text + avatar button is clicked.
   */
  function handleHome() {
    setMoreShown(false);
    history.push('/');
  }

  /**
   * Creates the home button.
   *
   * @returns The jsx for the home button.
   */
  function createHomeButton() {
    if (who === undefined) {
      return <ZCircularProgress className='ZTopNav-home-loading' size='sm' />;
    }

    if (who == null) {
      return null;
    }

    return (
      <Button className={`ZTopNav-btn-home ${styles.classes.home}`} data-testid='ZTopNav-btn-home' color='inherit' onClick={handleHome}>
        <ZImageSource className={`ZTopNav-avatar ${styles.classes.avatar}`} src={who.icon} />;
        <Typography className={`ZTopNav-title ${styles.classes.title}`} color='inherit' variant='h1'>
          {who.name}
        </Typography>
      </Button>
    );
  }

  /**
   * Occurs when an item in the more drawer is clicked.
   *
   * @param url The url
   * @param target The target for the open operation.
   */
  function handleLink(url: string, target: string) {
    setMoreShown(false);
    win.open(url, target);
  }

  /**
   * Occurs when the user clicks the profile button.
   */
  function handleProfile() {
    setMoreShown(false);

    if (profile == null) {
      return;
    }

    win.open(profile.domain, '_self');
  }

  /**
   * Returns the nav item for the source link.
   *
   * @returns The jsx for the source link.
   */
  function createNavSource() {
    if (!who?.source) {
      return null;
    }

    return (
      <>
        <Divider />
        {createNavItem('github', 'Github', <GithubIcon />, handleLink.bind(null, who.source, '_blank'))}
      </>
    );
  }

  /**
   * Creates an icon tag.
   *
   * @param icon The icon to display.
   *
   * @returns The icon image
   */
  function createAppIcon(icon: string) {
    return <ZImageSource className={`ZTopNav-app-icon ${styles.classes.icon}`} src={icon} />;
  }

  /**
   * Returns the nav app list.
   *
   * @returns The nav app list.
   */
  function createNavApps() {
    if (apps.data === undefined) {
      return <ZCircularProgress show />;
    }

    const ignore = [undefined, null, props.whoami, props.profileApp];
    const list: IZWebApp[] = apps.data || [];
    return <>{list.filter((app) => ignore.indexOf(app._id) < 0).map((app) => createNavItem(app._id, app.name, createAppIcon(app.icon), handleLink.bind(null, app.domain, '_self')))}</>;
  }

  /**
   * Creates a nav item in the more menu.
   *
   * @param id The id of the nav item.
   * @param display The display text.
   * @param avatar The avatar for the item.
   * @param handler The handler for the item.
   *
   * @returns The jsx for the nav list item.
   */
  function createNavItem(id: string, display: string, avatar: ReactNode, handler) {
    const clasz = `ZTopNav-drawer-more-item ZTopNav-drawer-more-item-${id}`;

    return (
      <ListItem key={id} className={clasz} button onClick={handler}>
        <ListItemIcon>{avatar}</ListItemIcon>
        <ListItemText primary={display} />
      </ListItem>
    );
  }

  /**
   * Creates the more side button that opens the drawer.
   *
   * @returns The jsx for the more button that opens the nav drawer.
   */
  function createMoreButton() {
    return (
      <>
        <Button className='ZTopNav-btn-more' data-testid='ZTopNav-btn-more' color='inherit' onClick={handleOpenMore}>
          <MenuOpenIcon />
        </Button>
        <Drawer anchor='right' open={moreShown} onClose={handleCloseMore}>
          <List className={`ZTopNav-drawer-more ${styles.classes.drawer}`} data-testid='ZTopNav-drawer-more'>
            {createNavItem('home', 'Home', <HomeIcon />, handleHome)}
            <Divider />
            {createNavApps()}
            {createNavSource()}
          </List>
        </Drawer>
      </>
    );
  }

  return (
    <AppBar className='ZTopNav-root' position='sticky' color='primary' data-testid='ZTopNav-root'>
      <Toolbar>
        {createHomeButton()}
        <Typography className={`ZTopNav-options ${styles.classes.options}`}>&nbsp;</Typography>
        <ZIdentityButton profile={identity.data} onLogin={handleProfile} onProfile={handleProfile} />
        {createMoreButton()}
      </Toolbar>
    </AppBar>
  );
}
