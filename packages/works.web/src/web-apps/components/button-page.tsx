import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import { setFirstOrDefault, ZSize, ZSizeFixed, ZSizeVaried } from '@zthun/works.core';
import { ZAlertBuilder } from '@zthun/works.message';
import {
  useAlertService,
  useSafeState,
  ZBooleanSwitch,
  ZButton,
  ZButtonColor,
  ZCard,
  ZChoiceDropDown,
  ZColorless,
  ZGridLayout,
  ZH3,
  ZNumberSlider,
  ZPaddedBox,
  ZParagraph,
  ZSeverityColor,
  ZToolbarLayout
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
  const [color, setColor] = useSafeState<ZButtonColor>(ZColorless.Inherit);
  const [width, setWidth] = useSafeState(0);
  const [height, setHeight] = useSafeState(0);
  const [outline, setOutline] = useSafeState(false);
  const [borderless, setBorderless] = useSafeState(false);
  const colors = values<ZButtonColor>(ZSeverityColor).concat([ZColorless.Inherit]);
  const _setColor = setFirstOrDefault.bind(null, setColor, ZColorless.Inherit);
  const sizes = [ZSizeVaried.Fit as ZSize].concat(values(ZSizeFixed)).concat([ZSizeVaried.Full]);

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
      heading='Button'
      subHeading='Standard button component'
      avatar={<SmartButtonIcon color='error' fontSize='inherit' />}
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
            color={color}
            borderless={borderless}
            width={sizes[width]}
            height={sizes[height]}
            outline={outline}
            onClick={handleClick}
            label='Button'
          />

          <ZButton
            label={<CheckCircleIcon fontSize='small' />}
            loading={loading}
            disabled={disabled}
            color={color}
            borderless={borderless}
            width={sizes[width]}
            height={sizes[height]}
            outline={outline}
            onClick={handleClick}
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
            value={[color]}
            onValueChange={_setColor}
            label='Color'
            options={colors}
            identifier={identity}
            renderOption={(c) => startCase(String(c))}
          />
          <ZGridLayout columns='auto auto 1fr' gap={ZSizeFixed.Large}>
            <ZNumberSlider
              label='Width'
              name='number-width'
              value={width}
              width={ZSizeFixed.Small}
              onValueChange={setWidth}
              min={0}
              max={sizes.length - 1}
            />
            <ZNumberSlider
              label='Height'
              name='number-height'
              width={ZSizeFixed.Small}
              value={height}
              onValueChange={setHeight}
              max={sizes.length - 1}
            />
          </ZGridLayout>
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
