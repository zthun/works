import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import ErrorIcon from '@mui/icons-material/Error';
import ForwardIcon from '@mui/icons-material/Forward';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import {
  getHttpCodeCategory,
  getHttpCodeDescription,
  getHttpCodeName,
  ZHttpCode,
  ZHttpCodeClient
} from '@zthun/works.http';
import { get } from 'lodash';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';
import { ZGridLayout } from '../layout/grid-layout';
import { useParams } from '../router/router-dom';
import { ZH2, ZSubtitle } from '../typography/typography';

/**
 * Represents properties for the status code page.
 */
export interface IZStatusCodePage {
  /**
   * The name of the route param that contains the code.
   */
  name: string;
}

/**
 * Renders a page that displays a status code card.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that renders the status code page.
 */
export function ZStatusCodePage(props: IZStatusCodePage) {
  const { name } = props;
  const params = useParams();
  const code: ZHttpCode = +get(params, name, ZHttpCodeClient.ImATeapot);

  const renderAvatar = () => {
    if (code === ZHttpCodeClient.ImATeapot) {
      return (
        <EmojiFoodBeverageTwoToneIcon
          className='ZStatusCodePage-icon ZStatusCodePage-teapot'
          fontSize='inherit'
          color='warning'
        />
      );
    }

    if (code >= 100 && code < 200) {
      return <InfoIcon className='ZStatusCodePage-icon ZStatusCodePage-info' fontSize='inherit' color='info' />;
    }

    if (code >= 200 && code < 300) {
      return (
        <CheckCircleIcon className='ZStatusCodePage-icon ZStatusCodePage-success' fontSize='inherit' color='success' />
      );
    }

    if (code >= 300 && code < 400) {
      return (
        <ForwardIcon className='ZStatusCodePage-icon ZStatusCodePage-redirect' fontSize='inherit' color='success' />
      );
    }

    if (code >= 400 && code < 500) {
      return <WarningIcon className='ZStatusCodePage-icon ZStatusCodePage-client' fontSize='inherit' color='warning' />;
    }

    return <ErrorIcon className='ZStatusCodePage-icon ZStatusCodePage-server' fontSize='inherit' color='error' />;
  };

  return (
    <ZGridLayout className='ZStatusCodePage-root' justifyContent='center'>
      <ZPaperCard
        avatar={renderAvatar()}
        headerText={getHttpCodeCategory(code)}
        subHeaderText={getHttpCodeName(code)}
        size='lg'
      >
        <ZSubtitle className='ZStatusCodePage-description'>{getHttpCodeDescription(code)}</ZSubtitle>
        <ZH2 className='ZStatusCodePage-code'>{code}</ZH2>
      </ZPaperCard>
    </ZGridLayout>
  );
}
