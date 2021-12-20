import GithubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppBar, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { IZWebApp } from '@zthun/works.core';
import { ZDataUrlBuilder } from '@zthun/works.url';
import { first } from 'lodash';
import React, { ReactNode, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useWebAppsAndWatch } from '../apps/web-apps.context';
import { IZComponentHeader } from '../component/component-header.interface';
import { ZIdentityButton } from '../identity/identity-button';
import { useIdentityAndWatch } from '../identity/identity.context';
import { ZCircularProgress } from '../loading/circular-progress';
import { makeStyles } from '../theme/make-styles';
import { useWindowService } from '../window/window-service.context';

/**
 * Represents properties for the top nav menu.
 */
export interface IZTopNavProps extends IZComponentHeader {
  /**
   * The id of the profile app.
   *
   * If you don't set this, then it will default to
   * the zthunworks profile app.
   *
   * @default roadblock
   */
  profileApp?: string;

  /**
   * The current id of the given application.
   *
   * The reason for setting this is to hide the application from
   * the list of web apps.
   *
   * If this is not set, the this component will not include
   * the github link.
   */
  whoami?: string;
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
  const [moreShown, setMoreShown] = useState(false);
  const profile = useIdentityAndWatch();
  const apps = useWebAppsAndWatch();
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
    return (
      <Button className={`ZTopNav-btn-home ${styles.classes.home}`} data-testid='ZTopNav-btn-home' color='inherit' onClick={handleHome}>
        {props.avatar}
        <Typography className={`ZTopNav-title ${styles.classes.title}`} color='inherit' variant='h1'>
          {props.headerText}
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

    const list = apps.data || [];
    const security = first(list.filter((app) => app._id === props.profileApp));

    if (security == null) {
      return;
    }

    win.open(security.domain, '_self');
  }

  /**
   * Returns the nav item for the source link.
   *
   * @returns The jsx for the source link.
   */
  function createNavSource() {
    const list = apps.data || [];
    const self = first(list.filter((app) => app._id === props.whoami));

    if (!self?.source) {
      return null;
    }

    return (
      <>
        <Divider />
        {createNavItem('github', 'Github', <GithubIcon />, handleLink.bind(null, self.source, '_blank'))}
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
    if (!icon) {
      return null;
    }

    if (icon.startsWith('data:image/svg+xml')) {
      // SVG images can go into html directly.
      const info = new ZDataUrlBuilder().parse(icon).info();
      const __html = info.buffer.toString();
      return <div className={`ZTopNav-app-icon ${styles.classes.icon}`} dangerouslySetInnerHTML={{ __html }} />;
    }

    // This is some other url.  Use the img tag for this one.
    return <img src={icon} className='ZTopNav-app-icon'></img>;
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
        <ZIdentityButton profile={profile.data} onLogin={handleProfile} onProfile={handleProfile} />
        {createMoreButton()}
      </Toolbar>
    </AppBar>
  );
}
