// cspell:disable
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { ZAlertBuilder, ZAlertSeverity } from '@zthun/works.message';
import {
  useAlertService,
  ZBorderLayout,
  ZCard,
  ZColorTint,
  ZH3,
  ZList,
  ZListDivider,
  ZListGroup,
  ZListLineItem,
  ZPaddedBox,
  ZParagraph,
  ZShadeColor
} from '@zthun/works.react';
import React from 'react';
import { ZComponentList } from '../../web-apps-components';

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
      heading={ZComponentList.name}
      subHeading={ZComponentList.description}
      avatar={ZComponentList.avatar}
    >
      <ZPaddedBox margin={{ bottom: ZSizeFixed.Large }}>
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
            <ZListGroup heading='Without Click Support' />
            <ZListLineItem
              prefix={<FavoriteIcon color='info' fontSize='large' />}
              name='avatar-and-text'
              heading='Prefix and Text (Unclickable)'
            />
            <ZListLineItem
              prefix={<FavoriteIcon color='warning' fontSize='large' />}
              name='avatar-text-and-adornment'
              heading='Prefix, Text, and Suffix (Unclickable)'
              suffix={<CheckCircleIcon color='primary' fontSize='large' />}
            />
            <ZListDivider />
            <ZListGroup heading='With Click Support'></ZListGroup>
            <ZListLineItem
              prefix={<CheckCircleIcon color='success' fontSize='large' />}
              suffix={<FavoriteIcon color='error' fontSize='large' />}
              name='everything'
              heading='Line Item Everything'
              subHeading='Line item with header, sub header, prefix, and suffix'
              onClick={showAlert.bind(null, 'Success', 'Line items are great', ZAlertSeverity.Success)}
            />
            <ZListLineItem
              name='text-only'
              heading='Text only line item'
              subHeading='Line item with just text'
              onClick={showAlert.bind(null, 'Warning', 'Pictures make line items pretty', ZAlertSeverity.Warning)}
            />
          </ZList>
        </ZBorderLayout>
      </ZPaddedBox>
    </ZCard>
  );
}
