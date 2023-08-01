import FlagIcon from '@mui/icons-material/Flag';
import SearchIcon from '@mui/icons-material/Search';
import { ZSizeFixed } from '@zthun/works.chonkify';
import {
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
import React, { useState } from 'react';
import { ZRouteText } from '../../../routes';

/**
 * Represents a demo for text.
 *
 * @returns The JSX to render the text demo page.
 */
export function ZTextPage() {
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [required, setRequired] = useState(false);
  const [adornments, setAdornments] = useState(false);
  const [value, setValue] = useState('');

  return (
    <ZCard
      className='ZTextPage-root'
      heading={ZRouteText.name}
      subHeading={ZRouteText.description}
      avatar={ZRouteText.avatar}
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

        <ZCaption className='ZTextPage-value' compact>
          Value: {JSON.stringify(value)}
        </ZCaption>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' name='disabled' />
          <ZBooleanSwitch value={readOnly} onValueChange={setReadOnly} label='ReadOnly' name='read-only' />
          <ZBooleanSwitch value={required} onValueChange={setRequired} label='Required' name='required' />
          <ZBooleanSwitch value={adornments} onValueChange={setAdornments} label='Adornments' name='adornments' />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
