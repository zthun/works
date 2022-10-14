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
      avatar={<SmartButtonIcon color='error' fontSize='inherit' />}
    >
      <h3>Description</h3>

      <p>
        Buttons are the staple of most application design and have been so for decades. It is a very clean concept to
        click a button that corresponds to an action and users are very used to clicking these.
      </p>

      <p>
        Buttons can have a label, but if you want to save real estate, you can always use a simple <i>iconography </i>
        button with a tooltip if you desire.
      </p>

      <h3>Button Demo</h3>

      <ZButton
        avatar={<CheckCircleIcon fontSize='small' />}
        loading={loading}
        disabled={disabled}
        color={color}
        outline={outline}
        onClick={handleClick}
        label='Button'
      />

      <h3>Iconography Demo</h3>

      <ZButton
        label={<CheckCircleIcon fontSize='small' />}
        loading={loading}
        disabled={disabled}
        color={color}
        outline={outline}
        onClick={handleClick}
        tooltip='Iconography Button'
      />

      <h3>Options</h3>
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
