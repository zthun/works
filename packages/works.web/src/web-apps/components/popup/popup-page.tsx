import { ZBox, ZCard, ZH3, ZParagraph, useFashionTheme } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZPopupButton } from '@zthun/works.react';
import React, { useMemo } from 'react';
import { ZRoutePopup } from '../../../routes';

/**
 * Represents a demo for popups.
 *
 * @returns
 *    The JSX to render the popup demo page.
 */
export function ZPopupPage() {
  const { success } = useFashionTheme();
  const PopupButtonProps = useMemo(() => ({ fashion: success, label: 'Open' }), []);

  return (
    <ZCard
      className='ZPopupPage-root'
      heading={ZRoutePopup.name}
      subHeading={ZRoutePopup.description}
      avatar={ZRoutePopup.avatar}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Popups are similar to drawers in that they let you extend the content to the user without having to show
        everything all at once. While some components, such as the Choice and Drawer, come with their own internal popup
        mechanism, the popup component lets you put anything you want in a popup and gives you an API to display that
        content whenever certain conditions are met.
      </ZParagraph>

      <ZPopupButton ButtonProps={PopupButtonProps}>
        <ZBox padding={ZSizeFixed.Large}>You can put anything you want in popup content.</ZBox>
      </ZPopupButton>
    </ZCard>
  );
}
