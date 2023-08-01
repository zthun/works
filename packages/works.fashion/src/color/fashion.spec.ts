import { describe, expect, it } from 'vitest';
import { ZFashionBuilder } from './fashion';
import { ZHue } from './hue';
import { ZShade } from './shade';

describe('ZFashion', () => {
  function createTestTarget() {
    return new ZFashionBuilder();
  }

  describe('Hue', () => {
    function assertHue(hue: ZHue, buildFn: (t: ZFashionBuilder) => ZFashionBuilder) {
      expect(buildFn(createTestTarget()).build().hue).toEqual(hue);
    }

    it('should set white', () => assertHue(ZHue.White, (t) => t.white()));
    it('should set red', () => assertHue(ZHue.Red, (t) => t.red()));
    it('should set pink', () => assertHue(ZHue.Pink, (t) => t.pink()));
    it('should set purple', () => assertHue(ZHue.Purple, (t) => t.purple()));
    it('should set violet', () => assertHue(ZHue.Violet, (t) => t.violet()));
    it('should set indigo', () => assertHue(ZHue.Indigo, (t) => t.indigo()));
    it('should set blue', () => assertHue(ZHue.Blue, (t) => t.blue()));
    it('should set sky', () => assertHue(ZHue.Sky, (t) => t.sky()));
    it('should set cyan', () => assertHue(ZHue.Cyan, (t) => t.cyan()));
    it('should set teal', () => assertHue(ZHue.Teal, (t) => t.teal()));
    it('should set green', () => assertHue(ZHue.Green, (t) => t.green()));
    it('should set olive', () => assertHue(ZHue.Olive, (t) => t.olive()));
    it('should set lime', () => assertHue(ZHue.Lime, (t) => t.lime()));
    it('should set yellow', () => assertHue(ZHue.Yellow, (t) => t.yellow()));
    it('should set amber', () => assertHue(ZHue.Amber, (t) => t.amber()));
    it('should set orange', () => assertHue(ZHue.Orange, (t) => t.orange()));
    it('should set persimmon', () => assertHue(ZHue.Persimmon, (t) => t.persimmon()));
    it('should set brown', () => assertHue(ZHue.Brown, (t) => t.brown()));
    it('should set grey', () => assertHue(ZHue.Grey, (t) => t.grey()));
    it('should set black', () => assertHue(ZHue.Black, (t) => t.black()));
  });

  describe('Shade', () => {
    function assertShade(shade: ZShade, buildFn: (t: ZFashionBuilder) => ZFashionBuilder) {
      expect(buildFn(createTestTarget()).build().shade).toEqual(shade);
    }

    it('should set shade 50', () => assertShade(50, (t) => t.red(50)));
    it('should set shade 100', () => assertShade(100, (t) => t.red(100)));
    it('should set shade 200', () => assertShade(200, (t) => t.red(200)));
    it('should set shade 300', () => assertShade(300, (t) => t.red(300)));
    it('should set shade 400', () => assertShade(400, (t) => t.red(400)));
    it('should set shade 500', () => assertShade(500, (t) => t.red(500)));
    it('should set shade 600', () => assertShade(600, (t) => t.red(600)));
    it('should set shade 700', () => assertShade(700, (t) => t.red(700)));
    it('should set shade 800', () => assertShade(800, (t) => t.red(800)));
    it('should set shade 900', () => assertShade(900, (t) => t.red(900)));
  });

  describe('Copy', () => {
    it('should copy another fashion', () => {
      const expected = createTestTarget().amber(200).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
