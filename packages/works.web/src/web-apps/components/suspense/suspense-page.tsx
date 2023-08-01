import { ZSizeFixed } from '@zthun/fashion-tailor';
import { setFirstOrDefault } from '@zthun/works.core';
import {
  ZBooleanSwitch,
  ZCard,
  ZChoiceDropDown,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZParagraph,
  ZSuspenseRotate
} from '@zthun/works.react';
import { identity, startCase, values } from 'lodash';
import React, { useState } from 'react';
import { ZRouteSuspense } from '../../../routes';

/**
 * Represents a demo for suspense indicators.
 *
 * @returns
 *        The JSX to render the suspense page.
 */
export function ZSuspensePage() {
  const [width, setWidth] = useState<ZSizeFixed>(ZSizeFixed.ExtraSmall);
  const [loading, setLoading] = useState<boolean>(true);
  const sizes = values(ZSizeFixed);
  const _setWidth = setFirstOrDefault.bind(null, setWidth, ZSizeFixed.ExtraSmall);

  return (
    <ZCard
      className='ZSuspensePage-root'
      heading={ZRouteSuspense.name}
      subHeading={ZRouteSuspense.description}
      avatar={ZRouteSuspense.avatar}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          If you load data from a server, or have to have the user wait for an operation to complete, then the
          appropriate display for that is some kind of animated, work, icon. These types of displays have very little
          configuration and are generally nothing more than to show users that things are still happening in the
          background. However, psychologically, they alleviate any user suspense when asynchronous operations are
          happening.
        </ZParagraph>

        <ZSuspenseRotate loading={loading} width={width} name='suspense' />
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={loading} onValueChange={setLoading} label='Loading' name='loading' />
          <ZChoiceDropDown
            name='width'
            value={[width]}
            onValueChange={_setWidth}
            options={sizes}
            renderOption={startCase}
            identifier={identity}
            label='Width'
          />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
