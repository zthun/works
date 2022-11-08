import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { setFirstOrDefault } from '@zthun/works.core';
import { IZFashionCoordination } from '@zthun/works.fashion';
import { ZAlertBuilder } from '@zthun/works.message';
import {
  useAlertService,
  useSafeState,
  useZthunworksFashion,
  useZthunworksFashionCoordinations,
  ZBooleanSwitch,
  ZButton,
  ZCard,
  ZChoiceDropDown,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZParagraph,
  ZToolbarLayout
} from '@zthun/works.react';
import { identity } from 'lodash';
import React from 'react';
import { ZComponentButton } from '../../web-apps-components';

/**
 * Represents a demo for buttons.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZButtonPage() {
  const alerts = useAlertService();
  const theme = useZthunworksFashion();
  const coordinations = useZthunworksFashionCoordinations();
  const [loading, setLoading] = useSafeState(false);
  const [disabled, setDisabled] = useSafeState(false);
  const [outline, setOutline] = useSafeState(false);
  const [borderless, setBorderless] = useSafeState(false);
  const [fashion, setFashion] = useSafeState<IZFashionCoordination>(theme.light);
  const _setFashion = setFirstOrDefault.bind(null, setFashion, theme.light);

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
    <ZCard
      className='ZButtonPage-root'
      heading={ZComponentButton.name}
      subHeading={ZComponentButton.description}
      avatar={ZComponentButton.avatar}
    >
      <ZPaddedBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Buttons are the staple of most application design and have been so for decades. It is a very clean concept to
          click a button that corresponds to an action and users are very used to clicking these.
        </ZParagraph>

        <ZParagraph>
          Buttons can have a label, but if you want to save real estate, you can always use a simple <i>iconography </i>
          button with a tooltip if you desire.
        </ZParagraph>

        <ZToolbarLayout>
          <ZButton
            avatar={<CheckCircleIcon fontSize='small' />}
            loading={loading}
            disabled={disabled}
            borderless={borderless}
            outline={outline}
            onClick={handleClick}
            label='Button'
            fashion={fashion}
          />

          <ZButton
            label={<CheckCircleIcon fontSize='small' />}
            loading={loading}
            disabled={disabled}
            borderless={borderless}
            outline={outline}
            onClick={handleClick}
            fashion={fashion}
            tooltip='Iconography Button'
          />
        </ZToolbarLayout>
      </ZPaddedBox>

      <ZPaddedBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>
        <ZGridLayout gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={loading} onValueChange={setLoading} label='Loading' />
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' />
          <ZBooleanSwitch value={outline} onValueChange={setOutline} label='Outline' />
          <ZBooleanSwitch value={borderless} onValueChange={setBorderless} label='Borderless' />
          <ZChoiceDropDown
            label='Fashion'
            indelible
            value={[fashion]}
            onValueChange={_setFashion}
            options={coordinations}
            renderOption={(f) => f.name}
            identifier={identity}
          />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
