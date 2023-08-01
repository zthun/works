import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import { useAmbassadorState } from '@zthun/helpful-react';
import { ZSizeFixed } from '@zthun/works.chonkify';
import { cssClass } from '@zthun/works.core';
import { colorify, IZFashion, ZFashionBuilder, ZHue, ZShade, ZShades } from '@zthun/works.fashion';
import React, { KeyboardEvent, MouseEvent, useMemo } from 'react';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { makeStyles } from '../theme/make-styles';
import { useFashionDesign } from './fashion';

/**
 * Represents a fashion wheel component
 */
export interface IZFashionGrid extends IZComponentValue<IZFashion>, IZComponentStyle {}

const useFashionGridStyles = makeStyles()((theme) => {
  const square = '2rem';

  return {
    row: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',

      marginBottom: theme.gap(ZSizeFixed.ExtraSmall)
    },

    block: {
      'boxSizing': 'border-box',
      'height': square,
      'width': square,
      'cursor': 'pointer',
      'marginRight': theme.gap(ZSizeFixed.ExtraSmall),

      '&:hover': {
        outline: `0.0625rem solid black`,
        border: `0.0625rem solid white`
      },

      '&[data-selected="true"]': {
        outline: `0.0625rem solid black`,
        border: `0.0625rem solid white`,
        transform: `scale(1.1)`
      }
    }
  };
});

/**
 * A wheel component for selection a fashion object.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZFashionGrid(props: IZFashionGrid) {
  const { className, value, onValueChange } = props;
  const _transparent = new ZFashionBuilder().transparent().build();
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, _transparent);
  const _valueJson = useMemo(() => JSON.stringify(_value), [_value]);
  const { palette } = useFashionDesign();
  const { classes } = useFashionGridStyles();

  const renderShade = (hue: ZHue, shade: ZShade) => {
    const key = `${hue}-${shade}`;
    const fashion = new ZFashionBuilder().hue(hue).shade(shade).build();
    const backgroundColor = colorify(palette, fashion);
    const selected = _valueJson === JSON.stringify(fashion);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === ZCircusKeyboardQwerty.space.code || e.code === ZCircusKeyboardQwerty.enter.code) {
        _setValue(fashion);
      }
    };

    const handleSelect = (e: MouseEvent) => {
      if (e.shiftKey && selected) {
        _setValue(new ZFashionBuilder().transparent().build());
      } else {
        _setValue(fashion);
      }
    };

    return (
      <div
        className={cssClass('ZFashionGrid-shade', classes.block)}
        key={key}
        data-selected={selected}
        data-hue={hue}
        data-shade={shade}
        style={{ backgroundColor }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleSelect}
      />
    );
  };

  const renderHue = (hue: ZHue) => {
    return (
      <div className={cssClass('ZFashionGrid-hue', classes.row)} data-hue={hue}>
        {ZShades.map((shade) => renderShade(hue, shade))}
      </div>
    );
  };

  // Note: We could render these in a loop using Object.values(ZHue), but we want
  // to render the hues in a specific order based on the color wheel values.
  return (
    <div className={cssClass('ZFashionGrid-root', className)}>
      {renderHue(ZHue.Red)}
      {renderHue(ZHue.Pink)}
      {renderHue(ZHue.Purple)}
      {renderHue(ZHue.Violet)}
      {renderHue(ZHue.Indigo)}
      {renderHue(ZHue.Blue)}
      {renderHue(ZHue.Sky)}
      {renderHue(ZHue.Cyan)}
      {renderHue(ZHue.Teal)}
      {renderHue(ZHue.Green)}
      {renderHue(ZHue.Olive)}
      {renderHue(ZHue.Lime)}
      {renderHue(ZHue.Yellow)}
      {renderHue(ZHue.Orange)}
      {renderHue(ZHue.Persimmon)}
      {renderHue(ZHue.Brown)}
      {renderHue(ZHue.Grey)}
    </div>
  );
}
