import { stringify, ZFashionBuilder } from '@zthun/works.fashion';
import { useSafeState, ZCaption, ZCard, ZFashionGrid, ZH3, ZParagraph } from '@zthun/works.react';
import React from 'react';
import { ZRouteFashion } from '../../../routes';

/**
 * Represents a demo for fashion color.
 *
 * @returns
 *    The JSX to render the fashion demo page.
 */
export function ZFashionPage() {
  const [fashion, setFashion] = useSafeState(new ZFashionBuilder().build());

  return (
    <ZCard
      className='ZFashionPage-root'
      heading={ZRouteFashion.name}
      subHeading={ZRouteFashion.description}
      avatar={ZRouteFashion.avatar}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Fashion is all about colors. Fashion is built upon a single, supported Hue value and adds various stages of
        color theory on top. All fashion objects start with a single hue and add an additional shade between 50 to 900.
        When all fashion hues are combined together with all possible shades in the fashion grid, this makes up your
        fashion palette.
      </ZParagraph>

      <ZFashionGrid value={fashion} onValueChange={setFashion} />

      <ZCaption className='ZFashionPage-selected' data-hue={fashion.hue} data-shade={fashion.shade}>
        Selected: {stringify(fashion)}
      </ZCaption>
    </ZCard>
  );
}
