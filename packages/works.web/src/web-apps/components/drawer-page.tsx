import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  useSafeState,
  ZButton,
  ZChoiceDropDown,
  ZDrawerButton,
  ZGridLayout,
  ZH3,
  ZPaddedBox,
  ZPaperCard,
  ZParagraph,
  ZStateAnchor,
  ZStateColor,
  ZStateSize
} from '@zthun/works.react';
import { first, identity, startCase } from 'lodash';
import React from 'react';

/**
 * Represents a demo for drawers.
 *
 * @returns The JSX to render the page.
 */
export function ZDrawerPage() {
  const [anchor, setAnchor] = useSafeState([ZStateAnchor.Left]);
  const [color, setColor] = useSafeState([ZStateColor.Inherit]);
  const [timestamp, setTimestamp] = useSafeState(new Date().getTime());
  const anchors = Object.values(ZStateAnchor);
  const colors = Object.values(ZStateColor);

  const now = () => setTimestamp(new Date().getTime());

  return (
    <ZPaperCard
      className='ZDrawerPage-root'
      headerText='Drawer'
      subHeaderText='Pop out content'
      avatar={<MenuOpenIcon color='success' fontSize='inherit' />}
    >
      <h3>Description</h3>
      <p>
        Drawers are a neat way to save real estate on a page. Most users will not need to see everything all at once and
        only need to navigate or view specific pieces of data when they need it. Thus, a drawer can easily be used to
        handle this information.
      </p>
      <p>
        However, be careful. You do not want to hide too much of your interface behind a drawer because it begins to
        turn into mystery meat features, where the user will not be able to figure out how to navigate your site, or
        know where specific pieces of information is.
      </p>
      <h3>Demo</h3>
      <ZDrawerButton
        ButtonProps={{ color: first(color) }}
        DrawerProps={{ anchor: first(anchor) }}
        closeOnChange={[timestamp]}
      >
        <ZPaddedBox padding={ZStateSize.Medium}>
          <ZH3>Drawer</ZH3>
          <ZParagraph>You can put whatever you want in a drawer.</ZParagraph>
          <ZButton
            color={first(color)}
            label='Close Drawer'
            avatar={<CloseIcon fontSize='inherit' color='inherit' />}
            onClick={now}
          />
        </ZPaddedBox>
      </ZDrawerButton>
      <h3>Options</h3>
      <ZGridLayout gap='md'>
        <ZChoiceDropDown
          value={anchor}
          onValueChange={setAnchor}
          options={anchors}
          label='Anchor'
          identifier={identity}
          renderOption={startCase}
        />
        <ZChoiceDropDown
          value={color}
          onValueChange={setColor}
          options={colors}
          label='Color'
          identifier={identity}
          renderOption={startCase}
        />
      </ZGridLayout>
    </ZPaperCard>
  );
}
