/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import React from 'react';
import { IZPopupAnchorOrigin } from './popup';
import { ZPopupButton } from './popup-button';
import { ZPopupButtonComponentModel } from './popup-button.cm';

describe('ZPopup', () => {
  let attachOrigin: IZPopupAnchorOrigin | undefined;
  let popupOrigin: IZPopupAnchorOrigin | undefined;

  async function createTestTarget() {
    const element = <ZPopupButton PopupProps={{ attachOrigin, popupOrigin }}>Content</ZPopupButton>;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZPopupButtonComponentModel);
  }

  beforeEach(() => {
    attachOrigin = undefined;
    popupOrigin = undefined;
  });

  describe('Open', () => {
    it('should open the popup when clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.open();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should open over the element', async () => {
      // Arrange
      attachOrigin = { horizontal: 'left', vertical: 'top' };
      popupOrigin = { horizontal: 'left', vertical: 'bottom' };
      const target = await createTestTarget();
      // Act.
      const actual = await target.open();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Close', () => {
    it('should close the popup when clicking on the backdrop', async () => {
      // Arrange.
      const target = await createTestTarget();
      const popup = await target.open();
      // Act.
      await popup.close();
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should close the popup when pressing the escape key', async () => {
      // Arrange.
      const target = await createTestTarget();
      const popup = await target.open();
      // Act.
      await popup.escape();
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Content', () => {
    it('should render the content', async () => {
      // Arrange.
      const target = await createTestTarget();
      const popup = await target.open();
      // Act.
      const actual = await (await popup.content()).text();
      // Assert.
      expect(actual).toEqual('Content');
    });
  });
});
