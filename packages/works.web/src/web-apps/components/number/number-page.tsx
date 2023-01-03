import { ZSizeFixed } from '@zthun/works.chonkify';

import {
  useSafeState,
  ZCaption,
  ZCard,
  ZGridLayout,
  ZH3,
  ZNumberInput,
  ZNumberSlider,
  ZPaddedBox,
  ZParagraph
} from '@zthun/works.react';
import React from 'react';
import { ZRouteNumber } from '../../../routes';

/**
 * Represents a demo for number inputs.
 *
 * @returns
 *        The JSX to render the number page.
 */
export function ZNumberPage() {
  const [value, setValue] = useSafeState<number | null>(1);

  return (
    <ZCard
      className='ZNumberPage-root'
      heading={ZRouteNumber.name}
      subHeading={ZRouteNumber.description}
      avatar={ZRouteNumber.avatar}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Often times, you will need to get a number from the user. Rather than trying to parse the number yourself,
          using a number component is much more efficient. Using number components will allow the user to enter what
          they want without needing to worry about numeric validations and you can let the JavaScript engine do the
          parsing for you.
        </ZParagraph>

        <ZPaddedBox padding={ZSizeFixed.Medium}>
          <ZGridLayout columns='1fr 1fr 1fr' gap={ZSizeFixed.ExtraLarge}>
            <ZNumberSlider step={1} min={1} max={1000} label='Slider' value={value || 1} onValueChange={setValue} />
            <ZNumberInput
              step={1}
              min={-Infinity}
              max={Infinity}
              label='Input'
              value={value}
              onValueChange={setValue}
            />
          </ZGridLayout>
        </ZPaddedBox>

        <ZCaption>Value: {value}</ZCaption>
      </ZPaddedBox>
    </ZCard>
  );
}
