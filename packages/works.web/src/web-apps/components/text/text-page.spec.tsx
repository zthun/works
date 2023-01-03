/* eslint-disable require-jsdoc */

import { IZCircusKey, ZCircusBy, ZCircusKeyboardQwerty } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { ZBooleanComponentModel, ZTextComponentModel } from '@zthun/works.react';
import React from 'react';
import { ZTextPage } from './text-page';
import { ZTextPageComponentModel } from './text-page.cm';

// cspell: disable-next-line
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

type TextInputFactory = (t: ZTextPageComponentModel) => Promise<ZTextComponentModel>;
type SwitchFactory = (t: ZTextPageComponentModel) => Promise<ZBooleanComponentModel>;
type ValueFactory = (t: ZTextComponentModel) => Promise<boolean>;

describe('ZTextPage', () => {
  async function createTestTarget() {
    const element = <ZTextPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZTextPageComponentModel);
  }

  async function shouldSetTheValue(expected: string, factory: TextInputFactory, commit?: IZCircusKey) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const input = await factory(target);
    await input.keyboard(expected, commit);
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function _shouldBe(option: SwitchFactory, value: ValueFactory, expected: boolean, factory: TextInputFactory) {
    // Arrange
    const target = await createTestTarget();
    const toggler = await option(target);
    await toggler.toggle(!expected);
    // Act.
    await toggler.toggle(expected);
    const text = await factory(target);
    const actual = await value(text);
    // Assert.
    expect(actual).toEqual(expected);
  }

  const shouldBeDisabled = _shouldBe.bind(
    null,
    (t) => t.disabled(),
    (c) => c.disabled()
  );

  const shouldBeReadOnly = _shouldBe.bind(
    null,
    (t) => t.readOnly(),
    (c) => c.readOnly()
  );

  const shouldBeRequired = _shouldBe.bind(
    null,
    (t) => t.required(),
    (c) => c.required()
  );

  async function shouldHaveAdornments(factory: TextInputFactory) {
    // Arrange
    const target = await createTestTarget();
    const adornments = await target.adornments();
    // Act.
    await adornments.toggle(true);
    const text = await factory(target);
    const prefix = await text.prefix();
    const suffix = await text.suffix();
    const actual = prefix && suffix;
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldNotHaveAdornments(factory: TextInputFactory) {
    // Arrange
    const target = await createTestTarget();
    const adornments = await target.adornments();
    // Act.
    await adornments.toggle(false);
    const text = await factory(target);
    const prefix = await text.prefix();
    const suffix = await text.suffix();
    const actual = prefix || suffix;
    // Assert.
    expect(actual).toBeFalsy();
  }

  describe('Basic Text Input', () => {
    const factory: TextInputFactory = (t) => t.text();

    it('should set the value', async () => {
      await shouldSetTheValue(LOREM, factory);
    });

    it('should set the value on the enter key', async () => {
      await shouldSetTheValue(LOREM, factory, ZCircusKeyboardQwerty.enter);
    });

    it('should be disabled when the disabled option is checked', async () => {
      await shouldBeDisabled(true, factory);
    });

    it('should not be disabled when the disabled option is unchecked', async () => {
      await shouldBeDisabled(false, factory);
    });

    it('should be readOnly when the read only option is checked', async () => {
      await shouldBeReadOnly(true, factory);
    });

    it('should not be readOnly when the read only option is unchecked', async () => {
      await shouldBeReadOnly(false, factory);
    });

    it('should be required when the required option is checked', async () => {
      await shouldBeRequired(true, factory);
    });

    it('should not be required when the required option is unchecked', async () => {
      await shouldBeRequired(false, factory);
    });

    it('should have adornments when the adornments option is checked', async () => {
      await shouldHaveAdornments(factory);
    });

    it('should not have adornments when the adornments option is checked', async () => {
      await shouldNotHaveAdornments(factory);
    });
  });

  describe('Password', () => {
    const factory: TextInputFactory = (t) => t.password();

    it('should set the value', async () => {
      await shouldSetTheValue(LOREM, factory);
    });

    it('should set the value on the enter key', async () => {
      await shouldSetTheValue(LOREM, factory, ZCircusKeyboardQwerty.enter);
    });

    it('should be disabled when the disabled option is checked', async () => {
      await shouldBeDisabled(true, factory);
    });

    it('should not be disabled when the disabled option is unchecked', async () => {
      await shouldBeDisabled(false, factory);
    });

    it('should be readOnly when the read only option is checked', async () => {
      await shouldBeReadOnly(true, factory);
    });

    it('should not be readOnly when the read only option is unchecked', async () => {
      await shouldBeReadOnly(false, factory);
    });

    it('should be required when the required option is checked', async () => {
      await shouldBeRequired(true, factory);
    });

    it('should not be required when the required option is unchecked', async () => {
      await shouldBeRequired(false, factory);
    });

    it('should have adornments when the adornments option is checked', async () => {
      await shouldHaveAdornments(factory);
    });

    it('should not have adornments when the adornments option is checked', async () => {
      await shouldNotHaveAdornments(factory);
    });
  });

  describe('Reveal', () => {
    const factory: TextInputFactory = (t) => t.reveal();

    it('should set the value', async () => {
      await shouldSetTheValue(LOREM, factory);
    });

    it('should set the value on the enter key', async () => {
      await shouldSetTheValue(LOREM, factory, ZCircusKeyboardQwerty.enter);
    });

    it('should be disabled when the disabled option is checked', async () => {
      await shouldBeDisabled(true, factory);
    });

    it('should not be disabled when the disabled option is unchecked', async () => {
      await shouldBeDisabled(false, factory);
    });

    it('should be readOnly when the read only option is checked', async () => {
      await shouldBeReadOnly(true, factory);
    });

    it('should not be readOnly when the read only option is unchecked', async () => {
      await shouldBeReadOnly(false, factory);
    });

    it('should be required when the required option is checked', async () => {
      await shouldBeRequired(true, factory);
    });

    it('should not be required when the required option is unchecked', async () => {
      await shouldBeRequired(false, factory);
    });

    it('should have adornments when the adornments option is checked', async () => {
      await shouldHaveAdornments(factory);
    });
  });

  describe('Text Area', () => {
    const factory: TextInputFactory = (t) => t.area();

    it('should set the value', async () => {
      await shouldSetTheValue(LOREM, factory);
    });

    it('should be disabled when the disabled option is checked', async () => {
      await shouldBeDisabled(true, factory);
    });

    it('should not be disabled when the disabled option is unchecked', async () => {
      await shouldBeDisabled(false, factory);
    });

    it('should be readOnly when the read only option is checked', async () => {
      await shouldBeReadOnly(true, factory);
    });

    it('should not be readOnly when the read only option is unchecked', async () => {
      await shouldBeReadOnly(false, factory);
    });

    it('should be required when the required option is checked', async () => {
      await shouldBeRequired(true, factory);
    });

    it('should not be required when the required option is unchecked', async () => {
      await shouldBeRequired(false, factory);
    });

    it('should have adornments when the adornments option is checked', async () => {
      await shouldHaveAdornments(factory);
    });

    it('should not have adornments when the adornments option is checked', async () => {
      await shouldNotHaveAdornments(factory);
    });
  });
});
