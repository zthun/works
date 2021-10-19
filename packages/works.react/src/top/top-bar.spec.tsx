/* eslint-disable require-jsdoc */
import { Button } from '@mui/material';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { kebabCase } from 'lodash';
import React from 'react';
import { Router } from 'react-router-dom';
import { ZTopBar } from './top-bar';
import { IZTopBarItem, ZTopBarItemBuilder } from './top-bar-item';

describe('ZTopBar', () => {
  const appName = 'ZTHUNWORKS';
  const homeRoute = '/home';

  let history: MemoryHistory;
  let route: IZTopBarItem;
  let separator: IZTopBarItem;
  let link: IZTopBarItem;
  let redirect: IZTopBarItem;
  let items: IZTopBarItem[];

  function createTestTarget() {
    return render(
      <Router history={history}>
        <ZTopBar headerText={appName} route={homeRoute} moreItems={items}>
          <Button data-testid='content-button'>Content Button</Button>
        </ZTopBar>
      </Router>
    );
  }

  beforeEach(() => {
    route = new ZTopBarItemBuilder().route('/home', 'Home').build();
    separator = new ZTopBarItemBuilder().separator().build();
    redirect = new ZTopBarItemBuilder().link('https://www.google.com', 'Google', '_self').build();
    link = new ZTopBarItemBuilder().link('mailto:support@zthunworks.com', 'Contact').build();
    items = [route, separator, link, redirect];
    history = createMemoryHistory();
    jest.spyOn(window, 'open').mockReturnValue(window);
  });

  afterEach(() => {
    (window.open as jest.Mock).mockClear();
  });

  it('renders the component', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZTopBar-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Home', () => {
    it('should move to the home page (visible to everyone).', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const home = target.getByText(appName);
      fireEvent.click(home);
      // Assert
      expect(history.location.pathname).toEqual(homeRoute);
    });
  });

  describe('Content', () => {
    it('should render child content.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const content = target.getByTestId('content-button');
      // Assert
      expect(content).toBeTruthy();
    });
  });

  describe('Drawer', () => {
    function openNavDrawer(target: RenderResult) {
      const more = target.getByTestId('ZTopBar-btn-more');
      fireEvent.click(more);
      return target.getByTestId('ZTopBar-drawer-more');
    }

    function clickMenuItem(drawer: HTMLElement, name: string) {
      const kebab = kebabCase(name);
      const clasz = `.ZTopBar-drawer-more-item-${kebab}`;
      const item = drawer.querySelector(clasz);
      fireEvent.click(item);
    }

    async function assertPushesHistory(expected: string, item: string) {
      // Arrange
      const target = createTestTarget();
      const drawer = openNavDrawer(target);
      // Act
      clickMenuItem(drawer, item);
      // Assert
      expect(history.location.pathname).toEqual(expected);
    }

    async function assertOpensWindow(expected: string, winTarget: string, item: string) {
      // Arrange
      jest.spyOn(window, 'open').mockReturnValue(window);
      const target = createTestTarget();
      const drawer = openNavDrawer(target);
      // Act
      clickMenuItem(drawer, item);
      // Assert
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining(expected), winTarget);
    }

    it('should open the nav drawer.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = openNavDrawer(target);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should move to a routed page.', async () => {
      await assertPushesHistory(route.route, route.headerText);
    });

    it('should open a link to a blank window.', async () => {
      await assertOpensWindow(link.link, '_blank', link.headerText);
    });

    it('should open a link to a specified target..', async () => {
      await assertOpensWindow(redirect.link, redirect.target, redirect.headerText);
    });
  });
});
