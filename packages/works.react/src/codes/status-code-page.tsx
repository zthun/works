import { Grid } from '@mui/material';
import { ZHttpCode } from '@zthun/works.http';
import React from 'react';
import { useParams } from '../router/router-dom';
import { ZHttpStatusCodeCard } from './http-code-card';

/**
 * Represents properties for the status code page.
 */
export interface IZStatusCodePageProps {
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
export function ZStatusCodePage(props: IZStatusCodePageProps) {
  const params = useParams();
  const code: ZHttpCode = +params[props.name];

  return (
    <Grid container={true} spacing={3} className='ZStatusCodePage-root' justifyContent='center'>
      <Grid item={true}>
        <ZHttpStatusCodeCard code={code} />
      </Grid>
    </Grid>
  );
}
