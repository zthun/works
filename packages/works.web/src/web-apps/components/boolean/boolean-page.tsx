import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import {
  useSafeState,
  ZBoolean,
  ZBooleanStyle,
  ZButton,
  ZChoice,
  ZGridLayout,
  ZPaperCard,
  ZStateColor,
  ZToolbar
} from '@zthun/works.react';
import { startCase } from 'lodash';
import React from 'react';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZBooleanPage() {
  const [disabled, setDisabled] = useSafeState(false);
  const [value, setValue] = useSafeState<boolean | null>(false);
  const [type, setType] = useSafeState<ZBooleanStyle[]>(['checkbox']);
  const [_type] = type;
  const types: ZBooleanStyle[] = ['checkbox', 'radio', 'inline-radio', 'switch'];

  const truthy = startCase(_type);
  const falsy = `${startCase(_type)} Off`;

  return (
    <ZPaperCard
      className='ZBooleanPage-root'
      headerText={'Boolean'}
      subHeaderText='Basic togglers'
      avatar={<CheckBoxIcon color='success' fontSize='large' />}
    >
      <ZBoolean
        disabled={disabled}
        value={value}
        onValueChange={setValue.bind(null)}
        type={_type}
        truthy={truthy}
        falsy={falsy}
      />

      <h2>Options</h2>
      <ZGridLayout gap='md'>
        <ZBoolean value={disabled} onValueChange={setDisabled} truthy='Disabled' />
        <ZChoice
          options={types}
          headerText='Type'
          indelible
          value={type}
          onValueChange={setType}
          renderOption={startCase}
        />
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
      </ZGridLayout>
    </ZPaperCard>
  );
}
