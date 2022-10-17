import AppsIcon from '@mui/icons-material/Apps';

import ErrorIcon from '@mui/icons-material/Error';

import GithubIcon from '@mui/icons-material/GitHub';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { cssClass, IZRouteOption } from '@zthun/works.core';
import { kebabCase, startCase } from 'lodash';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.';
import { IZDrawerButton, ZDrawerButton } from '../drawer/drawer-button';
import { ZImageSource } from '../image/image-source';
import { ZCircularProgress } from '../loading/circular-progress';
import { useLocation, useNavigate } from '../router/router-dom';
import { isStateErrored, isStateLoaded, isStateLoading } from '../state/use-async-state';
import { makeStyles } from '../theme/make-styles';
import { useWindowService } from '../window/window-service.context';
import { useWebApp, useWebApps } from './web-app-service';

export interface IZWebAppDrawer extends IZComponentStyle {
  /**
   * The properties for the drawer button.
   */
  DrawerButtonProps?: Omit<IZDrawerButton, 'closeOnChange' | 'children'>;

  /**
   * The optional route to navigate home.
   *
   * @default '/'
   */
  home?: string;

  /**
   * Optional routes heading routes to include for you application.
   */
  routes?: IZRouteOption[];

  /**
   * The identity of the current application.
   *
   * This is used to organize the top home list item.
   */
  whoami: string;
}

const useWebAppDrawerStyles = makeStyles()((theme) => ({
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
  }
}));

/**
 * A component that renders a navigation drawer for going to the home page, opening web apps, navigating through a site map, and viewing the source code.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this drawer component.
 */
export function ZWebAppDrawer(props: IZWebAppDrawer) {
  const { className, DrawerButtonProps, home = '/', routes, whoami } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const win = useWindowService();
  const [apps] = useWebApps();
  const [who] = useWebApp(whoami);
  const { classes } = useWebAppDrawerStyles();

  const _className = cssClass('ZWebAppDrawer-root', className);
  const _drawerButtonClassName = cssClass('ZWebAppDrawer-button', DrawerButtonProps?.className);

  const cssIconClass = (clasz?: string) => cssClass('ZWebAppDrawer-icon', clasz, classes.icon);

  const openBlank = (url: string) => win.open(url, '_blank');
  const openSelf = (url: string) => win.open(url, '_self');

  const createAppIcon = (icon: string | undefined) => {
    const clasz = cssIconClass('ZWebAppDrawer-icon-app');

    if (!icon) {
      return <AppsIcon className={clasz} color='success' />;
    }

    return <ZImageSource className={clasz} src={icon} />;
  };

  const createNavItem = (
    id: string,
    display: ReactNode | undefined,
    description: ReactNode | undefined,
    avatar: ReactNode,
    handler: () => any,
    type: string
  ) => {
    const key = kebabCase(id);
    const clasz = cssClass('ZWebAppDrawer-item', `ZWebAppDrawer-item-${type}`);

    return (
      <ListItem key={key} className={clasz} button onClick={handler} data-item-id={id} data-item-type={type}>
        <ListItemIcon>{avatar}</ListItemIcon>
        <ListItemText primary={display} secondary={description} />
      </ListItem>
    );
  };

  const createNavSource = () => {
    if (!isStateLoaded(who) || !who.source) {
      return null;
    }

    const icon = <GithubIcon className={cssIconClass('ZWebAppDrawer-source-icon')} />;

    return (
      <>
        {createNavItem('github', 'Github', 'View the source code', icon, openBlank.bind(null, who.source), 'source')}
        <Divider />
      </>
    );
  };

  const createNavRoutes = () => {
    if (!routes?.length) {
      return null;
    }

    const createNavRoute = (route: IZRouteOption) => {
      const avatar = <div className={cssIconClass('ZWebAppDrawer-icon-route')}>{route.avatar}</div>;
      return createNavItem(route.path, route.name, route.description, avatar, navigate.bind(null, route.path), 'route');
    };

    return (
      <>
        {routes.map((route) => createNavRoute(route))}
        <Divider />
      </>
    );
  };

  const createNavApps = () => {
    if (isStateLoading(apps)) {
      return (
        <>
          <ListItem className='ZWebAppDrawer-item-loading' button title='Loading'>
            <ListItemIcon>
              <ZCircularProgress show size='lg' />
            </ListItemIcon>
            <ListItemText>Loading...</ListItemText>
          </ListItem>
          <Divider />
        </>
      );
    }

    if (isStateErrored(apps) || !apps.length) {
      return null;
    }

    const ignore = [undefined, null, props.whoami];

    return (
      <>
        {apps
          .filter((app) => ignore.indexOf(app._id) < 0)
          .map((app) =>
            createNavItem(app._id, app.name, app.short, createAppIcon(app.icon), openSelf.bind(null, app.domain), 'app')
          )}
        <Divider />
      </>
    );
  };

  const createNavHome = () => {
    const iconClass = cssIconClass('ZWebAppDrawer-icon-home');
    let avatar: ReactNode;
    let name: ReactNode;
    let short: ReactNode;

    if (isStateLoading(who)) {
      avatar = <HourglassEmptyIcon className={iconClass} color='info' />;
      name = <ZCircularProgress show size='lg' />;
      short = '';
    } else if (isStateErrored(who)) {
      avatar = <ErrorIcon className={iconClass} color='error' />;
      name = startCase(whoami);
      short = who.message;
    } else {
      avatar = createAppIcon(who.icon);
      name = who.name;
      short = who.short;
    }

    return (
      <>
        {createNavItem(whoami, name, short, avatar, navigate.bind(null, home), 'home')}
        <Divider />
      </>
    );
  };

  return (
    <div className={_className}>
      <ZDrawerButton {...DrawerButtonProps} className={_drawerButtonClassName} closeOnChange={[location]}>
        <List className='ZWebAppDrawer-list'>
          {createNavHome()}
          {createNavApps()}
          {createNavRoutes()}
          {createNavSource()}
        </List>
      </ZDrawerButton>
    </div>
  );
}
