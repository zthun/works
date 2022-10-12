import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import {
  useSafeState,
  ZBooleanCheckbox,
  ZBooleanSwitch,
  ZButton,
  ZGridLayout,
  ZPaperCard,
  ZStateColor,
  ZToolbar
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
    <ZPaperCard
      className='ZBooleanPage-root'
      headerText={'Boolean'}
      subHeaderText='Basic togglers'
      avatar={<CheckBoxIcon color='success' fontSize='large' />}
    >
      <h2>Checkbox</h2>
      <ZBooleanCheckbox disabled={disabled} value={value} onValueChange={setValue.bind(null)} label='Checkbox' />

      <h2>Switch</h2>
      <ZBooleanSwitch disabled={disabled} value={!!value} onValueChange={setValue.bind(null)} label='Switch' />

      <h2>Value</h2>
      <div>{JSON.stringify(value)}</div>

      <h2>Options</h2>
      <ZGridLayout gap='md'>
        <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
      </ZGridLayout>

      <h2>Operations</h2>
      <ZToolbar>
        <ZButton
          avatar={<CheckBoxIcon color='success' />}
          outline
          color={ZStateColor.Success}
          onClick={setValue.bind(null, true)}
        >
          True
        </ZButton>
        <ZButton
          avatar={<CheckBoxOutlineBlankIcon color='error' />}
          outline
          color={ZStateColor.Error}
          onClick={setValue.bind(null, false)}
        >
          False
        </ZButton>
        <ZButton
          avatar={<IndeterminateCheckBoxIcon color='warning' />}
          outline
          color={ZStateColor.Warning}
          onClick={setValue.bind(null, null)}
        >
          Indeterminate
        </ZButton>
      </ZToolbar>
    </ZPaperCard>
  );
}
