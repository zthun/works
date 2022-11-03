import FlagIcon from '@mui/icons-material/Flag';
import SearchIcon from '@mui/icons-material/Search';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
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
  ZTextInputReveal,
  ZTextType
} from '@zthun/works.react';
import { ZTextArea } from '@zthun/works.react/src';
import React from 'react';
import { ZComponentText } from '../../web-apps-components';

/**
 * Represents a demo for text.
 *
 * @returns The JSX to render the text demo page.
 */
export function ZTextPage() {
  const [disabled, setDisabled] = useSafeState(false);
  const [readOnly, setReadOnly] = useSafeState(false);
  const [required, setRequired] = useSafeState(false);
  const [adornments, setAdornments] = useSafeState(false);
  const [value, setValue] = useSafeState('');

  return (
    <ZCard
      className='ZTextPage-root'
      heading={ZComponentText.name}
      subHeading={ZComponentText.description}
      avatar={ZComponentText.avatar}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          This is the most basic of inputs. You just enter in some text and the value is held. Most user input is done
          by reading and parsing strings under the hood.
        </ZParagraph>

        <ZPaddedBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGridLayout alignItems='center' columns='16rem ' gap={ZSizeFixed.Medium}>
            <ZTextInput
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='text'
              placeholder='Text'
              onValueChange={setValue}
              label='Text'
              prefix={adornments ? <FlagIcon color='success' /> : null}
              suffix={adornments ? <SearchIcon /> : null}
            />
            <ZTextInput
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='password'
              placeholder='Password'
              onValueChange={setValue}
              label='Password'
              type={ZTextType.Password}
              prefix={adornments ? <FlagIcon color='success' /> : null}
              suffix={adornments ? <SearchIcon /> : null}
            />
            <ZTextInputReveal
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='reveal'
              placeholder='Reveal Password'
              onValueChange={setValue}
              label='Reveal'
              prefix={adornments ? <FlagIcon color='success' /> : null}
              suffix={adornments ? <SearchIcon /> : null}
            />
            <ZTextArea
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='area'
              placeholder='Text Area'
              onValueChange={setValue}
              label='Area'
              prefix={adornments ? <FlagIcon color='success' /> : null}
              suffix={adornments ? <SearchIcon /> : null}
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
          <ZBooleanSwitch value={adornments} onValueChange={setAdornments} label='Adornments' />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
