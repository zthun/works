import GithubIcon from '@mui/icons-material/GitHub';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppBar, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { IZRouteOption } from '@zthun/works.core';
import { kebabCase } from 'lodash';
import React, { ReactNode, useState } from 'react';
import { useWebApp, useWebAppsAndWatch } from '../apps/web-apps.context';
import { ZHealthIndicator } from '../health/health-indicator';
import { ZIdentityButton } from '../identity/identity-button';
import { useIdentityAndWatch } from '../identity/identity.context';
import { ZImageSource } from '../image/image-source';
import { ZCircularProgress } from '../loading/circular-progress';
import { useNavigate } from '../router/router-dom';
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

  /**
   * Optional routes heading routes to include for you application.
   */
  routes?: IZRouteOption[];
}

const useTopNavStyles = makeStyles()((theme) => ({
  home: {
    height: theme.sizing.toolbar.md
  },

  title: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    textAlign: 'left',

    h6: {
      fontSize: theme.sizing.font.xs
    }
  },

  options: {
    flexGrow: 1
  },

  drawer: {
    'minWidth': theme.sizing.drawer.md,

    '.MuiDivider-root:last-child': {
      display: 'none'
    }
  },

  icon: {
    fill: 'currentColor',
    width: theme.sizing.icon.md,
    height: theme.sizing.icon.md,
    display: 'inline-block',
    fontSize: '3rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
    color: `rgb(${theme.palette.common.black}, 0.54)`,

    svg: {
      width: theme.sizing.icon.md,
      height: theme.sizing.icon.md
    },

    img: {
      width: theme.sizing.icon.md,
      height: theme.sizing.icon.md
    }
  },

  avatar: {
    height: '5rem',
    width: '5rem',
    marginRight: theme.sizing.gaps.sm,
    borderRadius: theme.rounding.circle,
    border: `${theme.sizing.thickness.xs} solid ${theme.palette.grey[200]}`,
    background: theme.palette.common.white,

    svg: {
      height: '5rem',
      width: '5rem'
    }
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
  const navigate = useNavigate();
  const win = useWindowService();
  const styles = useTopNavStyles();

  const handleOpenMore = setMoreShown.bind(null, true);
  const handleCloseMore = setMoreShown.bind(null, false);

  /**
   * Occurs when the home text + avatar button is clicked.
   */
  function handleHome() {
    setMoreShown(false);
    navigate('/');
  }

  /**
   * Creates the home button.
   *
   * @returns The jsx for the home button.
   */
  function createHomeButton() {
    if (who === undefined) {
      return <ZCircularProgress className='ZTopNav-home-loading' />;
    }

    if (who == null) {
      return null;
    }

    return (
      <Button className={`ZTopNav-btn-home ${styles.classes.home}`} data-testid='ZTopNav-btn-home' color='inherit' onClick={handleHome}>
        <ZImageSource className={`ZTopNav-avatar ${styles.classes.avatar}`} src={who.icon} />
        <div className={`ZTopNav-title ${styles.classes.title}`}>
          <Typography color='inherit' variant='h1'>
            {who.name}
          </Typography>
          <Typography color='inherit' variant='subtitle1'>
            {who.short}
          </Typography>
        </div>
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

    const icon = (
      <div className={`ZTopNav-app-icon ${styles.classes.icon}`}>
        <GithubIcon fontSize='inherit' />
      </div>
    );

    return (
      <>
        {createNavItem('github', 'Github', 'View the source code', icon, handleLink.bind(null, who.source, '_blank'))}
        <Divider />
      </>
    );
  }

  /**
   * Creates the home button in the nav.
   *
   * @returns The jsx for the home nav item
   */
  function createNavHome() {
    if (who == null) {
      return null;
    }

    return (
      <>
        {createNavItem('home', who.name, who.short, createAppIcon(who.icon), handleHome)}
        <Divider />
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
  function createAppIcon(icon: string | undefined) {
    return <ZImageSource className={`ZTopNav-app-icon ${styles.classes.icon}`} src={icon} />;
  }

  /**
   * Returns the nav app list.
   *
   * @returns The nav app list.
   */
  function createNavApps() {
    const { data } = apps;

    if (data === undefined) {
      return (
        <>
          <ListItem className='ZTopNav-drawer-more-apps-loading' button title='Loading'>
            <ListItemIcon>
              <ZCircularProgress show size='lg' />
            </ListItemIcon>
            <ListItemText>Loading...</ListItemText>
          </ListItem>
          <Divider />
        </>
      );
    }

    if (!data?.length) {
      return null;
    }

    const ignore = [undefined, null, props.whoami, props.profileApp];

    return (
      <>
        {data.filter((app) => ignore.indexOf(app._id) < 0).map((app) => createNavItem(app._id, app.name, app.short, createAppIcon(app.icon), handleLink.bind(null, app.domain, '_self')))}
        <Divider />
      </>
    );
  }

  /**
   * Creates a nav item in the more menu.
   *
   * @param id The id of the nav item.
   * @param display The display text.
   * @param description The secondary text.
   * @param avatar The avatar for the item.
   * @param handler The handler for the item.
   *
   * @returns The jsx for the nav list item.
   */
  function createNavItem(id: string, display: string | undefined, description: string | undefined, avatar: ReactNode, handler: any) {
    const key = kebabCase(id);
    const clasz = `ZTopNav-drawer-more-item ZTopNav-drawer-more-item-${key}`;

    return (
      <ListItem key={key} className={clasz} button title={description} onClick={handler}>
        <ListItemIcon>{avatar}</ListItemIcon>
        <ListItemText primary={display} secondary={description} />
      </ListItem>
    );
  }

  /**
   * Creates an individual route item.
   *
   * @param route The route to make an item for.
   *
   * @returns The jsx for the route.
   */
  function createNavRoute(route: IZRouteOption) {
    const handleRoute = () => {
      setMoreShown(false);
      navigate(route.path);
    };

    const avatar = <div className={`ZTopNav-app-icon ${styles.classes.icon}`}>{route.avatar}</div>;

    return createNavItem(route.path, route.name, route.description, avatar, handleRoute);
  }

  /**
   * Creates the route options for the app.
   *
   * @returns The jsx for displaying route information.
   */
  function createNavRoutes() {
    const { routes } = props;

    if (!routes?.length) {
      return null;
    }

    return (
      <>
        {routes.map((route) => createNavRoute(route))}
        <Divider />
      </>
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
            {createNavHome()}
            {createNavApps()}
            {createNavRoutes()}
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
        <Typography className={`ZTopNav-options ${styles.classes.options}`}></Typography>
        <ZIdentityButton profile={identity.data} onLogin={handleProfile} onProfile={handleProfile} />
        <ZHealthIndicator />
        {createMoreButton()}
      </Toolbar>
    </AppBar>
  );
}
