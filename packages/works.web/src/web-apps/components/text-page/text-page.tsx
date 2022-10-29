import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FlagIcon from '@mui/icons-material/Flag';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SearchIcon from '@mui/icons-material/Search';
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
  ZTextInput,
  ZTextSensitive
} from '@zthun/works.react';
import React from 'react';

/**
 * Represents a demo for text.
 *
 * @returns The JSX to render the text demo page.
 */
export function ZTextPage() {
  const [disabled, setDisabled] = useSafeState(false);
  const [readOnly, setReadOnly] = useSafeState(false);
  const [required, setRequired] = useSafeState(false);
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
          <ZGridLayout alignItems='center' columns='auto auto' gap={ZSizeFixed.Medium}>
            <ZTextInput
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='input'
              placeholder='Placeholder'
              onValueChange={setValue}
              label='Text Input'
            />
            <ZTextSensitive
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='sensitive'
              placeholder='Password'
              onValueChange={setValue}
              label='Text Sensitive'
            />
            <ZTextInput
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='adornments'
              placeholder='Adornments'
              onValueChange={setValue}
              label='Text Input With Adornments'
              prefix={<FlagIcon color='success' />}
              suffix={<SearchIcon />}
            />
            <ZTextSensitive
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='sensitive-adornments'
              placeholder='Sensitive Adornments'
              onValueChange={setValue}
              label='Sensitive Text With Adornments'
              prefix={<QuestionMarkIcon color='info' />}
              suffix={<PrivacyTipIcon />}
            />
          </ZGridLayout>
        </ZPaddedBox>

        <ZCaption compact>Value: {JSON.stringify(value)}</ZCaption>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
          <ZBooleanSwitch value={readOnly} onValueChange={setReadOnly} label='ReadOnly' />
          <ZBooleanSwitch value={required} onValueChange={setRequired} label='Required' />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
