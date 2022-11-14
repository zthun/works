import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { ZFashionBuilder } from '@zthun/works.fashion';
import { useSafeState, ZCard, ZFashionGrid, ZH3, ZPaddedBox, ZParagraph } from '@zthun/works.react';
import { startCase } from 'lodash';
import React from 'react';
import { ZComponentFashion } from '../../web-apps-components';

/**
 * Represents a demo for fashion color.
 *
 * @returns
 *    The JSX to render the fashion demo page.
 */
export function ZFashionPage() {
  const [fashion, setFashion] = useSafeState(new ZFashionBuilder().build());

  const toFashionString = () => {
    if (fashion.hue == null) {
      return 'Transparent';
    }

    if (fashion.hue === 'inherit') {
      return 'Inherit';
    }

    return `${startCase(fashion.hue)}[${fashion.shade}]`;
  };

  return (
    <ZCard
      className='ZFashionPage-root'
      heading={ZComponentFashion.name}
      subHeading={ZComponentFashion.description}
      avatar={ZComponentFashion.avatar}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Fashion is all about colors. Fashion is built upon a single, supported Hue value and adds various stages of
        color theory on top. All fashion objects start with a single hue and add an additional shade between 50 to 900.
        When all fashion hues are combined together with all possible shades in the fashion grid, this makes up your
        fashion palette.
      </ZParagraph>

      <ZFashionGrid value={fashion} onValueChange={setFashion} />

      <ZPaddedBox
        className='ZFashionPage-selected'
        margin={{ top: ZSizeFixed.Medium }}
        data-hue={fashion.hue}
        data-shade={fashion.shade}
      >
        <span>Selected: </span>
        <span className='ZFashionPage-selected-fashion'>{toFashionString()}</span>
      </ZPaddedBox>
    </ZCard>
  );
}
