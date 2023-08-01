import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { ZSizeFixed } from '@zthun/works.chonkify';
import {
  useFashionDesign,
  ZBooleanCheckbox,
  ZBooleanSwitch,
  ZButton,
  ZCaption,
  ZCard,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZParagraph,
  ZToolbarLayout
} from '@zthun/works.react';
import React, { useState } from 'react';
import { ZRouteBoolean } from '../../../routes';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZBooleanPage() {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<boolean | null>(false);
  const { success, error, warning } = useFashionDesign();

  return (
    <ZCard
      className='ZBooleanPage-root'
      heading={ZRouteBoolean.name}
      subHeading={ZRouteBoolean.description}
      avatar={ZRouteBoolean.avatar}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          It is almost inevitable that you will need some form of values that represent true and false. There are many
          ways to represent such a value in a web form.
        </ZParagraph>

        <ZPaddedBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGridLayout alignItems='center' columns='auto auto 1fr' gap={ZSizeFixed.ExtraSmall}>
            <ZBooleanCheckbox
              disabled={disabled}
              value={value}
              onValueChange={setValue.bind(null)}
              label='Checkbox'
              name='checkbox'
            />
            <ZBooleanSwitch
              disabled={disabled}
              value={!!value}
              onValueChange={setValue.bind(null)}
              label='Switch'
              name='switch'
            />
          </ZGridLayout>
        </ZPaddedBox>

        <ZCaption compact>
          <span>Value:</span>
          <span className='ZBooleanPage-value'>{JSON.stringify(value)}</span>
        </ZCaption>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' name='disabled' />
        </ZGridLayout>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Operations</ZH3>

        <ZToolbarLayout>
          <ZButton
            avatar={<CheckBoxIcon />}
            outline
            fashion={success}
            onClick={setValue.bind(null, true)}
            label='True'
            name='on'
          />
          <ZButton
            avatar={<CheckBoxOutlineBlankIcon />}
            outline
            fashion={error}
            onClick={setValue.bind(null, false)}
            label='False'
            name='off'
          />
          <ZButton
            avatar={<IndeterminateCheckBoxIcon />}
            outline
            fashion={warning}
            onClick={setValue.bind(null, null)}
            label='Indeterminate'
            name='indeterminate'
          />
        </ZToolbarLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
