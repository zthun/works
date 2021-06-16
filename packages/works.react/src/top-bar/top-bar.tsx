import { AppBar, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { kebabCase } from 'lodash';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IZTopBarItem } from './top-bar-item.interface';
import { IZTopBarProps } from './top-bar.props';

/**
 * Renders a circular progress that can render nothing or the material ui circular progress.
 *
 * @param props The properties for the card.
 *
 * @returns The jsx for a circular loading progress.
 */
export function ZTopBar(props: IZTopBarProps): JSX.Element {
  const [moreShown, setMoreShown] = useState(false);
  const hist = useHistory();

  const handleOpenMore = setMoreShown.bind(null, true);
  const handleCloseMore = setMoreShown.bind(null, false);

  /**
   * Occurs when the home text + avatar button is clicked.
   */
  function handleHome() {
    setMoreShown(false);
    hist.push(props.route);
  }

  /**
   * Creates the home button.
   *
   * @returns The jsx for the home button.
   */
  function createHomeButton() {
    return (
      <Button className='ZTopBar-btn-home' data-testid='ZTopBar-btn-home' color='inherit' onClick={handleHome}>
        {props.avatar}
        <Typography className='ZTopBar-title' color='inherit' variant='h1'>
          {props.headerText}
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
            {props.moreItems.map((item, index) => createMoreNavItem(item, index))}
          </List>
        </Drawer>
      </Fragment>
    );
  }
  return (
    <AppBar className='ZTopBar-root' position='sticky' color='primary' data-testid='ZTopBar-root'>
      <Toolbar>
        {createHomeButton()}
        <Typography className='ZthunworksMenu-options'>&nbsp;</Typography>
        {props.children}
        {createMoreButton()}
      </Toolbar>
    </AppBar>
  );
}

ZTopBar.defaultProps = {
  moreItems: []
};
