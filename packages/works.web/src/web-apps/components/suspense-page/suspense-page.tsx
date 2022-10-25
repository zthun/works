import LoopIcon from '@mui/icons-material/Loop';
import { setFirstOrDefault, ZSizeFixed } from '@zthun/works.core';
import {
  useSafeState,
  ZBooleanSwitch,
  ZCard,
  ZChoiceDropDown,
  ZColorless,
  ZColorTint,
  ZGridLayout,
  ZH3,
  ZHueColor,
  ZParagraph,
  ZSeverityColor,
  ZShadeColor,
  ZStateColor,
  ZSuspenseRotate
} from '@zthun/works.react';
import { identity, startCase, values } from 'lodash';
import React from 'react';

/**
 * Represents a demo for suspense indicators.
 *
 * @returns
 *        The JSX to render the suspense page.
 */
export function ZSuspensePage() {
  const [width, setWidth] = useSafeState<ZSizeFixed>(ZSizeFixed.ExtraSmall);
  const [color, setColor] = useSafeState<ZStateColor>(ZColorless.Inherit);
  const [tint, setTint] = useSafeState<ZColorTint>(ZColorTint.Main);
  const [loading, setLoading] = useSafeState<boolean>(true);
  const sizes = values(ZSizeFixed);
  const _setWidth = setFirstOrDefault.bind(null, setWidth, ZSizeFixed.ExtraSmall);
  const colors = values<ZStateColor>(ZSeverityColor)
    .concat(values(ZHueColor))
    .concat(values(ZShadeColor))
    .concat(values(ZColorless));
  const _setColor = setFirstOrDefault.bind(null, setColor, ZColorless.Inherit);
  const tints = values(ZColorTint);
  const _setTint = setFirstOrDefault.bind(null, setTint, ZColorTint.Main);

  return (
    <ZCard
      className='ZLoadingPage-root'
      heading='Loading'
      subHeading='Spinners that spin'
      avatar={<LoopIcon color='warning' fontSize='inherit' />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        If you load data from a server, or have to have the user wait for an operation to complete, then the appropriate
        display for that is some kind of animated, work, icon. These types of displays have very little configuration
        and are generally nothing more than to show users that things are still happening in the background. However,
        psychologically, they alleviate any user suspense when asynchronous operations are happening.
      </ZParagraph>

      <ZSuspenseRotate loading={loading} color={color} tint={tint} width={width} />

      <ZH3>Options</ZH3>

      <ZGridLayout gap={ZSizeFixed.Medium}>
        <ZBooleanSwitch value={loading} onValueChange={setLoading} label='Loading' />
        <ZChoiceDropDown
          name='width'
          value={[width]}
          onValueChange={_setWidth}
          options={sizes}
          renderOption={startCase}
          identifier={identity}
          label='Width'
        />
        <ZChoiceDropDown
          name='color'
          value={[color]}
          onValueChange={_setColor}
          options={colors}
          renderOption={startCase}
          identifier={identity}
          label='Color'
        />
        <ZChoiceDropDown
          name='tint'
          value={[tint]}
          onValueChange={_setTint}
          options={tints}
          renderOption={startCase}
          identifier={identity}
          label='Tint'
        />
      </ZGridLayout>
    </ZCard>
  );
}
