// cspell:disable
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { ZSizeFixed } from '@zthun/works.core';
import { ZAlertBuilder, ZAlertSeverity } from '@zthun/works.message';
import {
  useAlertService,
  ZBorderLayout,
  ZCard,
  ZColorTint,
  ZH3,
  ZList,
  ZListLineItem,
  ZParagraph,
  ZShadeColor
} from '@zthun/works.react';
import React from 'react';

/**
 * Represents a demo for lists.
 *
 * @returns
 *    The JSX to render the list demo page.
 */
export function ZListPage() {
  const alerts = useAlertService();

  const showAlert = async (header: string, msg: string, severity: ZAlertSeverity) => {
    const alert = new ZAlertBuilder().header(header).message(msg).severity(severity).build();
    await alerts.create(alert);
  };

  return (
    <ZCard
      className='ZListPage-root'
      heading='List'
      subHeading='Showing multiple items'
      avatar={<FormatListNumberedIcon color='info' fontSize='inherit' />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Lists help with displaying arrays and collections of data. You can think of a list component as an unordered
        list (&lt;ul&gt;) in html. The most basic kind of list item comes in the form of a line item. A line item is a
        basic 0-1-0 flex container that shows an avatar, a text header with a sub header, and an end adornment.
      </ZParagraph>

      <ZParagraph>
        Line items can be clickable or readonly and this can be toggled by simply setting or not setting the onClick
        event to a truthy or falsy value respectively.
      </ZParagraph>

      <ZBorderLayout background={{ color: ZShadeColor.Grey, tint: ZColorTint.Light }} width={ZSizeFixed.Medium}>
        <ZList>
          <ZListLineItem
            avatar={<CheckCircleIcon color='success' fontSize='large' />}
            adornment={<FavoriteIcon color='error' fontSize='large' />}
            name='everything'
            heading='Line Item Everything'
            subHeading='Line item with header, sub header, avatar, adornment'
            onClick={showAlert.bind(null, 'Success', 'Line items are great', ZAlertSeverity.Success)}
          />
          <ZListLineItem
            name='text-only'
            heading='Text only line item'
            subHeading='Line item with just text'
            onClick={showAlert.bind(null, 'Warning', 'Pictures make line items pretty', ZAlertSeverity.Warning)}
          />
          <ZListLineItem
            avatar={<FavoriteIcon color='info' fontSize='large' />}
            name='avatar-and-text'
            heading='Avatar and Text (Unclickable)'
          />
          <ZListLineItem
            avatar={<FavoriteIcon color='warning' fontSize='large' />}
            name='avatar-text-and-adornment'
            heading='Avatar, Text, and Adornment (Unclickable)'
            adornment={<CheckCircleIcon color='primary' fontSize='large' />}
          />
        </ZList>
      </ZBorderLayout>
    </ZCard>
  );
}
