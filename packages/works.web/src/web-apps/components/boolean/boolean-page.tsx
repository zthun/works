import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { ZSizeFixed } from '@zthun/works.chonkify';
import {
  useFashionDesign,
  useSafeState,
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
import React from 'react';
import { ZComponentBoolean } from '../../web-apps-components';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZBooleanPage() {
  const [disabled, setDisabled] = useSafeState(false);
  const [value, setValue] = useSafeState<boolean | null>(false);
  const { success, error, warning } = useFashionDesign();

  return (
    <ZCard
      className='ZBooleanPage-root'
      heading={ZComponentBoolean.name}
      subHeading={ZComponentBoolean.description}
      avatar={ZComponentBoolean.avatar}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          It is almost inevitable that you will need some form of values that represent true and false. There are many
          ways to represent such a value in a web form.
        </ZParagraph>

        <ZPaddedBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGridLayout alignItems='center' columns='auto auto 1fr' gap={ZSizeFixed.ExtraSmall}>
            <ZBooleanCheckbox disabled={disabled} value={value} onValueChange={setValue.bind(null)} label='Checkbox' />
            <ZBooleanSwitch disabled={disabled} value={!!value} onValueChange={setValue.bind(null)} label='Switch' />
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

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Operations</ZH3>

        <ZToolbarLayout>
          <ZButton
            avatar={<CheckBoxIcon />}
            outline
            fashion={success}
            onClick={setValue.bind(null, true)}
            label='True'
          />
          <ZButton
            avatar={<CheckBoxOutlineBlankIcon />}
            outline
            fashion={error}
            onClick={setValue.bind(null, false)}
            label='False'
          />
          <ZButton
            avatar={<IndeterminateCheckBoxIcon />}
            outline
            fashion={warning}
            onClick={setValue.bind(null, null)}
            label='Indeterminate'
          />
        </ZToolbarLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
