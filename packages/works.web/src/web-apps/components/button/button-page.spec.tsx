/* eslint-disable require-jsdoc */
import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { IZFashionCoordination } from '@zthun/works.fashion';
import { createDefaultFashionDesign, ZAlertList, ZButtonComponentModel } from '@zthun/works.react';
import { first } from 'lodash';
import React from 'react';
import { ZButtonPage } from './button-page';
import { ZButtonPageComponentModel } from './button-page.cm';

describe('ZButtonPage', () => {
  async function createTestTarget() {
    const element = (
      <>
        <ZAlertList />
        <ZButtonPage />
      </>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZButtonPageComponentModel);
  }

  const fashion = createDefaultFashionDesign();
  type ButtonPageFactory = (t: ZButtonPageComponentModel) => Promise<ZButtonComponentModel>;

  async function shouldRaiseAnAlertWhenClicked(factory: ButtonPageFactory) {
    // Arrange.
    const target = await createTestTarget();
    const alertList = await target.alerts();
    const button = await factory(target);
    // Act.
    await button.click();
    const actual = first(await alertList.alerts());
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldDisableWhenOptionIs(expected: boolean, factory: ButtonPageFactory) {
    // Arrange.
    const target = await createTestTarget();
    const disabled = await target.disabled();
    await disabled.toggle(!expected);
    // Act.
    await disabled.toggle(expected);
    const button = await factory(target);
    const actual = await button.disabled();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeOutlined(expected: boolean, factory: ButtonPageFactory) {
    // Arrange
    const target = await createTestTarget();
    const outline = await target.outline();
    await outline.toggle(!expected);
    // Act.
    await outline.toggle(expected);
    const button = await factory(target);
    const actual = await button.outlined();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeBorderless(expected: boolean, factory: ButtonPageFactory) {
    // Arrange
    const target = await createTestTarget();
    const borderless = await target.borderless();
    await borderless.toggle(!expected);
    // Act.
    await borderless.toggle(expected);
    const button = await factory(target);
    const actual = await button.borderless();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeLoading(expected: boolean, factory: ButtonPageFactory) {
    // Arrange
    const target = await createTestTarget();
    const loading = await target.loading();
    await loading.toggle(!expected);
    // Act.
    await loading.toggle(expected);
    const button = await factory(target);
    const actual = await button.loading();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertSetsFashion(coordination: IZFashionCoordination, factory: ButtonPageFactory) {
    // Arrange
    const target = await createTestTarget();
    const fashion = await target.fashion();
    const name = coordination.name!;
    await fashion.select(name);
    // Act.
    const button = await factory(target);
    const actual = await button.fashion();
    const color = await button.color();
    // Assert.
    expect(actual).toEqual(name);
    expect(color).toEqual(coordination.main.hue);
  }

  describe('Basic Button', () => {
    it('should raise an alert when clicked', async () => {
      await shouldRaiseAnAlertWhenClicked((t) => t.button());
    });

    it('should enable when the disabled option is unchecked.', async () => {
      await shouldDisableWhenOptionIs(false, (t) => t.button());
    });

    it('should disable when the disabled option is checked.', async () => {
      await shouldDisableWhenOptionIs(true, (t) => t.button());
    });

    it('should be solid when the outline option is unchecked.', async () => {
      await shouldBeOutlined(false, (t) => t.button());
    });

    it('should outline when the outline option is checked.', async () => {
      await shouldBeOutlined(true, (t) => t.button());
    });

    it('should not be borderless when the borderless option is unchecked.', async () => {
      await shouldBeBorderless(false, (t) => t.button());
    });

    it('should be borderless when the borderless option is checked.', async () => {
      await shouldBeBorderless(true, (t) => t.button());
    });

    it('should not be loading when the loading option is unchecked.', async () => {
      await shouldBeLoading(false, (t) => t.button());
    });

    it('should be loading when the loading option is checked.', async () => {
      await shouldBeLoading(true, (t) => t.button());
    });

    describe('Fashion', () => {
      it('should update to Primary.', async () => {
        await assertSetsFashion(fashion.primary, (t) => t.button());
      });

      it('should update to Secondary.', async () => {
        await assertSetsFashion(fashion.secondary, (t) => t.button());
      });

      it('should update to Success.', async () => {
        await assertSetsFashion(fashion.success, (t) => t.button());
      });

      it('should update to Warning.', async () => {
        await assertSetsFashion(fashion.warning, (t) => t.button());
      });

      it('should update to Error.', async () => {
        await assertSetsFashion(fashion.error, (t) => t.button());
      });

      it('should update to Info.', async () => {
        await assertSetsFashion(fashion.info, (t) => t.button());
      });

      it('should update to Light.', async () => {
        await assertSetsFashion(fashion.light, (t) => t.button());
      });

      it('should update to Dark.', async () => {
        await assertSetsFashion(fashion.dark, (t) => t.button());
      });
    });
  });

  describe('Icon Button', () => {
    it('should raise an alert when clicked', async () => {
      await shouldRaiseAnAlertWhenClicked((t) => t.iconButton());
    });

    it('should enable when the disabled option is unchecked.', async () => {
      await shouldDisableWhenOptionIs(false, (t) => t.iconButton());
    });

    it('should disable when the disabled option is checked.', async () => {
      await shouldDisableWhenOptionIs(true, (t) => t.iconButton());
    });

    it('should be solid when the outline option is unchecked.', async () => {
      await shouldBeOutlined(false, (t) => t.iconButton());
    });

    it('should outline when the outline option is checked.', async () => {
      await shouldBeOutlined(true, (t) => t.iconButton());
    });

    it('should not be borderless when the borderless option is unchecked.', async () => {
      await shouldBeBorderless(false, (t) => t.iconButton());
    });

    it('should be borderless when the borderless option is checked.', async () => {
      await shouldBeBorderless(true, (t) => t.iconButton());
    });

    it('should not be loading when the loading option is unchecked.', async () => {
      await shouldBeLoading(false, (t) => t.iconButton());
    });

    it('should be loading when the loading option is checked.', async () => {
      await shouldBeLoading(true, (t) => t.iconButton());
    });

    describe('Fashion', () => {
      it('should update to Primary.', async () => {
        await assertSetsFashion(fashion.primary, (t) => t.iconButton());
      });

      it('should update to Secondary.', async () => {
        await assertSetsFashion(fashion.secondary, (t) => t.iconButton());
      });

      it('should update to Success.', async () => {
        await assertSetsFashion(fashion.success, (t) => t.iconButton());
      });

      it('should update to Warning.', async () => {
        await assertSetsFashion(fashion.warning, (t) => t.iconButton());
      });

      it('should update to Error.', async () => {
        await assertSetsFashion(fashion.error, (t) => t.iconButton());
      });

      it('should update to Info.', async () => {
        await assertSetsFashion(fashion.info, (t) => t.iconButton());
      });

      it('should update to Light.', async () => {
        await assertSetsFashion(fashion.light, (t) => t.iconButton());
      });

      it('should update to Dark.', async () => {
        await assertSetsFashion(fashion.dark, (t) => t.iconButton());
      });
    });
  });
});
