import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { ZStateSize } from '@zthun/works.core';
import {
  useSafeState,
  ZBooleanCheckbox,
  ZBooleanSwitch,
  ZButton,
  ZGridLayout,
  ZPaperCard,
  ZSeverityColor,
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
      avatar={<CheckBoxIcon color='success' fontSize='inherit' />}
    >
      <h3>Description</h3>

      <p>
        It is almost inevitable that you will need some form of values that represent true and false. There are many
        ways to represent such a value in a web form.
      </p>

      <h3>Checkbox Demo</h3>

      <p>
        The most basic way to represent true or false is with a checkbox. A checkbox is checked when the value is true,
        and unchecked when the value is false. With a checkbox, there is also a 3rd, indeterminate state for which the
        logic value cannot be determined. We use JavaScripts null value for this state.
      </p>

      <ZBooleanCheckbox disabled={disabled} value={value} onValueChange={setValue.bind(null)} label='Checkbox' />

      <h3>Switch Demo</h3>

      <p>
        Another, more modern way to represent true and false is with a switch. A switch is more pleasing to the eyes of
        a user, but the only downside is that it cannot have an indeterminate state. If you do not have a pressing need
        for supporting a null state for true and false, then a switch is the better choice.
      </p>

      <ZBooleanSwitch disabled={disabled} value={!!value} onValueChange={setValue.bind(null)} label='Switch' />

      <h3>Value</h3>
      <div>{JSON.stringify(value)}</div>

      <h3>Options</h3>
      <ZGridLayout gap={ZStateSize.Medium}>
        <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
      </ZGridLayout>

      <h2>Operations</h2>
      <ZToolbar>
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
      </ZToolbar>
    </ZPaperCard>
  );
}
