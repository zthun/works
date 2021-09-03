/* istanbul ignore file */
import { AppBar, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { kebabCase } from 'lodash';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZTopBarItem } from './top-bar-item';

/**
 * Represents the properties for the top bar.
 *
 * @deprecated Use the @see IZTopNavProps instead.
 */
export interface IZTopBarProps extends IZComponentHeader, IZComponentHierarchy {
  /**
   * The route to migrate to when the avatar or headerText is clicked.
   */
  route: string;

  /**
   * The item list that appears in the drawer.
   */
  moreItems?: IZTopBarItem[];
}

/**
 * Renders a top bar.
 *
 * @param props The properties for the top bar.
 *
 * @deprecated Use the top nav instead.  This will be overtaken in the future.
 *
 * @returns The jsx for the top bar.
 */
export function ZTopBar(props: IZTopBarProps): JSX.Element {
  const { moreItems = [], children = null, headerText, route, avatar = null } = props;
  const [moreShown, setMoreShown] = useState(false);
  const hist = useHistory();

  const handleOpenMore = setMoreShown.bind(null, true);
  const handleCloseMore = setMoreShown.bind(null, false);

  /**
   * Occurs when the home text + avatar button is clicked.
   */
  function handleHome() {
    setMoreShown(false);
    hist.push(route);
  }

  /**
   * Creates the home button.
   *
   * @returns The jsx for the home button.
   */
  function createHomeButton() {
    return (
      <Button className='ZTopBar-btn-home' data-testid='ZTopBar-btn-home' color='inherit' onClick={handleHome}>
        {avatar}
        <Typography className='ZTopBar-title' color='inherit' variant='h1'>
          {headerText}
        </Typography>
      </Button>
    );
  }

  /**
   * Occurs when an item in the more drawer is clicked.
   *
   * @param item The item that was clicked.
   */
  function handleMoreItem(item: IZTopBarItem) {
    setMoreShown(false);

    if (item.route) {
      hist.push(item.route);
    }

    if (item.link) {
      window.open(item.link, item.target || '_blank');
    }
  }

  /**
   * Creates a nav item in the more menu.
   *
   * @param item The item for the nav.
   * @param index The index which specifies the key to the list item.
   *
   * @returns The jsx for the nav list item.
   */
  function createMoreNavItem(item: IZTopBarItem, index: number) {
    if (item.separator) {
      return <Divider key={index} />;
    }

    const kebab = kebabCase(item.headerText);
    const clasz = `ZTopBar-drawer-more-item ZTopBar-drawer-more-item-${kebab}`;

    return (
      <ListItem key={index} className={clasz} button onClick={handleMoreItem.bind(null, item)}>
        <ListItemIcon>{item.avatar}</ListItemIcon>
        <ListItemText primary={item.headerText} secondary={item.subHeaderText} />
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
      <Fragment>
        <Button className='ZTopBar-btn-more' data-testid='ZTopBar-btn-more' color='inherit' onClick={handleOpenMore}>
          <MenuOpenIcon />
        </Button>
        <Drawer anchor='right' open={moreShown} onClose={handleCloseMore}>
          <List className='ZTopBar-drawer-more' data-testid='ZTopBar-drawer-more'>
            {moreItems.map((item, index) => createMoreNavItem(item, index))}
          </List>
        </Drawer>
      </Fragment>
    );
  }
  return (
    <AppBar className='ZTopBar-root' position='sticky' color='primary' data-testid='ZTopBar-root'>
      <Toolbar>
        {createHomeButton()}
        <Typography className='ZTopBar-options'>&nbsp;</Typography>
        {children}
        {createMoreButton()}
      </Toolbar>
    </AppBar>
  );
}
