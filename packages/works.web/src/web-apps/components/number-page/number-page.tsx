import NumbersIcon from '@mui/icons-material/Numbers';
import { ZSizeFixed } from '@zthun/works.core';

import { useSafeState, ZCaption, ZCard, ZH3, ZNumberSlider, ZPaddedBox, ZParagraph } from '@zthun/works.react';
import React from 'react';

/**
 * Represents a demo for number inputs.
 *
 * @returns
 *        The JSX to render the number page.
 */
export function ZNumberPage() {
  const [value, setValue] = useSafeState<number>(1);

  return (
    <ZCard
      className='ZNumberPage-root'
      heading='Number'
      subHeading='Spinners and Sliders'
      avatar={<NumbersIcon color='success' fontSize='inherit' />}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Often times, you will need to get a number from the user. Rather than trying to parse the number yourself,
          using a number component is much more efficient. Using number components will allow the user to enter what
          they want without needing to worry about numeric validations and you can let the JavaScript engine do the
          parsing for you.
        </ZParagraph>

        <ZNumberSlider
          step={1}
          min={1}
          max={1000}
          label='Slider'
          width={ZSizeFixed.Large}
          value={value}
          onValueChange={setValue}
        />

        <ZCaption>Value: {value}</ZCaption>
      </ZPaddedBox>
    </ZCard>
  );
}
