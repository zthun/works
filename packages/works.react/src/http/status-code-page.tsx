import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import ErrorIcon from '@mui/icons-material/Error';
import ForwardIcon from '@mui/icons-material/Forward';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { ZSizeFixed } from '@zthun/works.chonkify';
import { cssClass } from '@zthun/works.core';
import {
  getHttpCodeCategory,
  getHttpCodeDescription,
  getHttpCodeName,
  ZHttpCode,
  ZHttpCodeCategory,
  ZHttpCodeClient
} from '@zthun/works.http';
import { get } from 'lodash';
import React from 'react';
import { ZCard } from '../card/card';
import { IZComponentName } from '../component/component-name';
import { ZGridLayout } from '../layout/grid-layout';
import { useParams } from '../router/router-dom';
import { makeStyles } from '../theme/make-styles';
import { ZParagraph } from '../typography/typography';

const useStatusCodePageStyles = makeStyles<ZHttpCode>()((theme) => {
  return {
    code: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: 'bold',
      fontSize: '8rem',
      textAlign: 'center',
      display: 'inline-block',
      width: '100%'
    }
  };
});

/**
 * Renders a page that displays a status code card.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that renders the status code page.
 */
export function ZStatusCodePage(props: IZComponentName) {
  const { name = 'code' } = props;
  const params = useParams();
  const code: ZHttpCode = +get(params, name, ZHttpCodeClient.ImATeapot) || 418;
  const { classes } = useStatusCodePageStyles(code);

  const renderAvatar = () => {
    if (code === ZHttpCodeClient.ImATeapot) {
      return (
        <EmojiFoodBeverageTwoToneIcon
          className='ZStatusCodePage-icon ZStatusCodePage-teapot'
          fontSize='inherit'
          color='secondary'
          data-category={ZHttpCodeCategory.Client}
        />
      );
    }

    if (code >= 100 && code < 200) {
      return (
        <InfoIcon
          className='ZStatusCodePage-icon ZStatusCodePage-info'
          data-category={ZHttpCodeCategory.InformationalResponse}
          fontSize='inherit'
          color='info'
        />
      );
    }

    if (code >= 200 && code < 300) {
      return (
        <CheckCircleIcon
          className='ZStatusCodePage-icon ZStatusCodePage-success'
          data-category={ZHttpCodeCategory.Success}
          fontSize='inherit'
          color='success'
        />
      );
    }

    if (code >= 300 && code < 400) {
      return (
        <ForwardIcon
          className='ZStatusCodePage-icon ZStatusCodePage-redirect'
          data-category={ZHttpCodeCategory.Redirection}
          fontSize='inherit'
          color='info'
        />
      );
    }

    if (code >= 400 && code < 500) {
      return (
        <WarningIcon
          className='ZStatusCodePage-icon ZStatusCodePage-client'
          data-category={ZHttpCodeCategory.Client}
          fontSize='inherit'
          color='warning'
        />
      );
    }

    return (
      <ErrorIcon
        className='ZStatusCodePage-icon ZStatusCodePage-server'
        data-category={ZHttpCodeCategory.Server}
        fontSize='inherit'
        color='error'
      />
    );
  };

  return (
    <ZGridLayout className='ZStatusCodePage-root' justifyContent='center'>
      <ZCard
        avatar={renderAvatar()}
        heading={getHttpCodeCategory(code)}
        subHeading={getHttpCodeName(code)}
        width={ZSizeFixed.Large}
      >
        <ZParagraph className='ZStatusCodePage-description'>{getHttpCodeDescription(code)}</ZParagraph>
        <span className={cssClass('ZStatusCodePage-code', classes.code)}>{code}</span>
      </ZCard>
    </ZGridLayout>
  );
}
