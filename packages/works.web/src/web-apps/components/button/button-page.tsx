import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import { setFirstOrDefault } from '@zthun/works.core';
import { ZAlertBuilder } from '@zthun/works.message';
import {
  useAlertService,
  useSafeState,
  ZBooleanSwitch,
  ZButton,
  ZChoiceDropDown,
  ZGridLayout,
  ZPaperCard,
  ZStateColor
} from '@zthun/works.react';
import { identity, startCase, values } from 'lodash';
import React from 'react';

/**
 * Represents a demo for buttons.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZButtonPage() {
  const alerts = useAlertService();
  const [loading, setLoading] = useSafeState(false);
  const [disabled, setDisabled] = useSafeState(false);
  const [color, setColor] = useSafeState<ZStateColor>(ZStateColor.Inherit);
  const [outline, setOutline] = useSafeState(false);
  const colors = values(ZStateColor);
  const _setColor = setFirstOrDefault.bind(null, setColor, ZStateColor.Inherit);

  /**
   * Occurs when the button demo is clicked.
   */
  async function handleClick() {
    const youClickedTheButton = new ZAlertBuilder()
      .success()
      .header('Button Clicked')
      .message('You clicked the button')
      .build();
    await alerts.create(youClickedTheButton);
  }

  return (
    <ZPaperCard
      className='ZButtonPage-root'
      headerText={'Button'}
      subHeaderText='Standard button component'
      avatar={<SmartButtonIcon color='error' fontSize='large' />}
    >
      <ZButton
        avatar={<CheckCircleIcon fontSize='small' />}
        loading={loading}
        disabled={disabled}
        color={color}
        outline={outline}
        onClick={handleClick}
        label='Button'
      />

      <h2>Options</h2>
      <ZGridLayout gap='md'>
        <ZBooleanSwitch value={loading} onValueChange={setLoading} label='Loading' />
        <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
        <ZBooleanSwitch value={outline} onValueChange={setOutline} label='Outline' />
        <ZChoiceDropDown
          value={[color]}
          onValueChange={_setColor}
          label='Color'
          options={colors}
          identifier={identity}
          renderOption={(c) => startCase(String(c))}
        />
      </ZGridLayout>
    </ZPaperCard>
  );
}
