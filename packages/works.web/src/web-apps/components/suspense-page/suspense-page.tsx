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
  ZHueColor,
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
  const [height, setHeight] = useSafeState<ZSizeFixed>(ZSizeFixed.ExtraSmall);
  const [color, setColor] = useSafeState<ZStateColor>(ZColorless.Inherit);
  const [tint, setTint] = useSafeState<ZColorTint>(ZColorTint.Main);
  const [loading, setLoading] = useSafeState<boolean>(true);
  const sizes = values(ZSizeFixed);
  const _setWidth = setFirstOrDefault.bind(null, setWidth, ZSizeFixed.ExtraSmall);
  const _setHeight = setFirstOrDefault.bind(null, setHeight, ZSizeFixed.ExtraSmall);
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
      <h3>Description</h3>

      <p>
        If you load data from a server, or have to have the user wait for an operation to complete, then the appropriate
        display for that is some kind of animated, work, icon. These types of displays have very little configuration
        and are generally nothing more than to show users that things are still happening in the background. However,
        psychologically, they alleviate any user suspense when asynchronous operations are happening in the background.
      </p>

      <ZSuspenseRotate loading={loading} width={width} height={height} />

      <h3>Options</h3>
      <ZGridLayout gap={ZSizeFixed.Medium}>
        <ZBooleanSwitch value={loading} onValueChange={setLoading} label='Loading' />
        <ZChoiceDropDown
          name='width'
          value={[width]}
          onValueChange={_setWidth}
          options={sizes}
          identifier={identity}
          label='Width'
        />
        <ZChoiceDropDown
          name='height'
          value={[height]}
          onValueChange={_setHeight}
          options={sizes}
          identifier={identity}
          label='Height'
        />
        <ZChoiceDropDown
          name='color'
          value={[color]}
          onValueChange={_setColor}
          options={colors}
          identifier={startCase}
          label='Color'
        />
        <ZChoiceDropDown
          name='tint'
          value={[tint]}
          onValueChange={_setTint}
          options={tints}
          identifier={startCase}
          label='Tint'
        />
      </ZGridLayout>
    </ZCard>
  );
}
