import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { setFirstOrDefault, ZSizeFixed } from '@zthun/works.core';
import {
  useSafeState,
  ZButton,
  ZButtonColor,
  ZCard,
  ZChoiceDropDown,
  ZColorless,
  ZDrawerButton,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZParagraph,
  ZSeverityColor,
  ZStateAnchor
} from '@zthun/works.react';
import { identity, startCase, values } from 'lodash';
import React from 'react';

/**
 * Represents a demo for drawers.
 *
 * @returns The JSX to render the page.
 */
export function ZDrawerPage() {
  const [anchor, setAnchor] = useSafeState<ZStateAnchor>(ZStateAnchor.Left);
  const [color, setColor] = useSafeState<ZButtonColor>(ZColorless.Inherit);
  const [timestamp, setTimestamp] = useSafeState(new Date().getTime());
  const anchors = values(ZStateAnchor);
  const colors = values<ZButtonColor>(ZSeverityColor).concat([ZColorless.Inherit]);

  const now = () => setTimestamp(new Date().getTime());

  return (
    <ZCard
      className='ZDrawerPage-root'
      heading='Drawer'
      subHeading='Pop out content'
      avatar={<MenuOpenIcon color='success' fontSize='inherit' />}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Drawers are a neat way to save real estate on a page. Most users will not need to see everything all at once
          and only need to navigate or view specific pieces of data when they need it. Thus, a drawer can easily be used
          to handle this information.
        </ZParagraph>

        <ZParagraph>
          However, be careful. You do not want to hide too much of your interface behind a drawer because it begins to
          turn into mystery meat features, where the user will not be able to figure out how to navigate your site, or
          know where specific pieces of information is.
        </ZParagraph>

        <ZDrawerButton ButtonProps={{ color }} DrawerProps={{ anchor }} closeOnChange={[timestamp]}>
          <ZPaddedBox padding={ZSizeFixed.Medium}>
            <ZH3>Drawer</ZH3>
            <ZParagraph>You can put whatever you want in a drawer.</ZParagraph>
            <ZButton
              color={color}
              label='Close Drawer'
              avatar={<CloseIcon fontSize='inherit' color='inherit' />}
              onClick={now}
            />
          </ZPaddedBox>
        </ZDrawerButton>
      </ZPaddedBox>

      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGridLayout gap={ZSizeFixed.Medium}>
          <ZChoiceDropDown
            value={[anchor]}
            onValueChange={setFirstOrDefault.bind(null, setAnchor, ZStateAnchor.Left)}
            options={anchors}
            label='Anchor'
            identifier={identity}
            renderOption={startCase}
            indelible
          />
          <ZChoiceDropDown
            value={[color]}
            onValueChange={setFirstOrDefault.bind(null, setColor, ZColorless.Inherit)}
            options={colors}
            label='Color'
            identifier={identity}
            renderOption={startCase}
          />
        </ZGridLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
