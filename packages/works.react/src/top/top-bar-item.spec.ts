/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZTopBarItem, ZTopBarItemBuilder } from './top-bar-item';

describe('ZTopBarItemBuilder', () => {
  function createTestTarget() {
    return new ZTopBarItemBuilder();
  }

  describe('Properties', () => {
    it('should set the avatar.', () => {
      assertBuilderSetsProperty(
        'avatar',
        createTestTarget,
        (t, v) => t.avatar(v),
        (i: IZTopBarItem) => i.avatar
      );
    });

    it('should set the subheader text.', () => {
      assertBuilderSetsProperty(
        'Subheader',
        createTestTarget,
        (t, v) => t.subHeaderText(v),
        (i: IZTopBarItem) => i.subHeaderText
      );
    });

    describe('Separator', () => {
      it('should set the separator flag.', () => {
        assertBuilderSetsProperty(
          true,
          createTestTarget,
          (t) => t.separator(),
          (i: IZTopBarItem) => i.separator
        );
      });
    });

    describe('Routed Item', () => {
      it('should set the route.', () => {
        assertBuilderSetsProperty(
          '/home',
          createTestTarget,
          (t, v) => t.route(v, 'header'),
          (i: IZTopBarItem) => i.route
        );
      });

      it('should set the header text.', () => {
        assertBuilderSetsProperty(
          'Header',
          createTestTarget,
          (t, v) => t.route('/home', v),
          (i: IZTopBarItem) => i.headerText
        );
      });
    });

    describe('Link Item', () => {
      it('should set the link.', () => {
        assertBuilderSetsProperty(
          'https://www.google.com',
          createTestTarget,
          (t, v) => t.link(v, 'Google'),
          (i: IZTopBarItem) => i.link
        );
      });

      it('should set the header text.', () => {
        assertBuilderSetsProperty(
          'Google',
          createTestTarget,
          (t, v) => t.link('https://www.google.com', v),
          (i: IZTopBarItem) => i.headerText
        );
      });

      it('should set the target.', () => {
        assertBuilderSetsProperty(
          '_self',
          createTestTarget,
          (t, v) => t.link('https://www.google.com', 'Google', v),
          (i: IZTopBarItem) => i.target
        );
      });
    });
  });
});
