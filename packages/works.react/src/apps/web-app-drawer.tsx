import AppsIcon from '@mui/icons-material/Apps';

import ErrorIcon from '@mui/icons-material/Error';

import GithubIcon from '@mui/icons-material/GitHub';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { Divider } from '@mui/material';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import { kebabCase, startCase } from 'lodash';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.';
import { IZDrawerButton, ZDrawerButton } from '../drawer/drawer-button';
import { ZImageSource } from '../image/image-source';
import { ZList } from '../list/list';
import { ZListLineItem } from '../list/list-line-item';
import { useLocation, useNavigate } from '../router/router-dom';
import { isStateErrored, isStateLoaded, isStateLoading } from '../state/use-async-state';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { makeStyles } from '../theme/make-styles';
import { useWindowService } from '../window/window-service';
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
   * The identity of the current application.
   *
   * This is used to organize the top home list item.
   */
  whoami: string;
}

const useWebAppDrawerStyles = makeStyles()((theme) => ({
  icon: {
    fontSize: '4rem',
    marginRight: theme.gap()
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
  const { className, DrawerButtonProps, home = '/', whoami } = props;
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

    return <ZImageSource className={clasz} src={icon} width={ZSizeFixed.Medium} height={ZSizeFixed.Medium} />;
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
      <ZListLineItem
        key={key}
        className={clasz}
        onClick={handler}
        name={id}
        prefix={avatar}
        heading={display}
        subHeading={description}
      />
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

  const createNavApps = () => {
    if (isStateLoading(apps)) {
      return (
        <>
          <ZListLineItem
            className='ZWebAppDrawer-item-loading'
            heading='Loading...'
            prefix={<ZSuspenseRotate width={ZSizeFixed.Large} />}
          />
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
      name = <ZSuspenseRotate width={ZSizeFixed.Large} />;
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
        <ZList className='ZWebAppDrawer-list'>
          {createNavHome()}
          {createNavApps()}
          {createNavSource()}
        </ZList>
      </ZDrawerButton>
    </div>
  );
}
