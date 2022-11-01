import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import {
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
  ZSeverityColor,
  ZToolbarLayout
} from '@zthun/works.react';
import React from 'react';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZBooleanPage() {
  const [disabled, setDisabled] = useSafeState(false);
  const [value, setValue] = useSafeState<boolean | null>(false);

  return (
    <ZCard
      className='ZBooleanPage-root'
      heading={'Boolean'}
      subHeading='Basic togglers'
      avatar={<CheckBoxIcon color='success' fontSize='inherit' />}
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
            avatar={<CheckBoxIcon color='success' />}
            outline
            color={ZSeverityColor.Success}
            onClick={setValue.bind(null, true)}
            label='True'
          />
          <ZButton
            avatar={<CheckBoxOutlineBlankIcon color='error' />}
            outline
            color={ZSeverityColor.Error}
            onClick={setValue.bind(null, false)}
            label='False'
          />
          <ZButton
            avatar={<IndeterminateCheckBoxIcon color='warning' />}
            outline
            color={ZSeverityColor.Warning}
            onClick={setValue.bind(null, null)}
            label='Indeterminate'
          />
        </ZToolbarLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
