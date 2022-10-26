import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ZSizeFixed } from '@zthun/works.core';
import {
  useSafeState,
  ZBooleanSwitch,
  ZCaption,
  ZCard,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZParagraph,
  ZTextInput
} from '@zthun/works.react';
import React from 'react';

/**
 * Represents a demo for text.
 *
 * @returns The JSX to render the text demo page.
 */
export function ZTextPage() {
  const [disabled, setDisabled] = useSafeState(false);
  const [value, setValue] = useSafeState('');

  return (
    <ZCard
      className='ZTextPage-root'
      heading='Text'
      subHeading='Enter some strings'
      avatar={<CheckBoxIcon color='success' fontSize='inherit' />}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          This is the most basic of inputs. You just enter in some text and the value is held. Most user input is done
          by reading and parsing strings under the hood.
        </ZParagraph>

        <ZPaddedBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGridLayout alignItems='center' columns='auto 1fr' gap={ZSizeFixed.ExtraSmall}>
            <ZTextInput value={value} onValueChange={setValue} label='Text Input' />
          </ZGridLayout>
        </ZPaddedBox>

        <ZCaption compact>Value: {JSON.stringify(value)}</ZCaption>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
