import { Button, Grid } from '@material-ui/core';
import { ZMarkdownViewer } from '@zthun/works.react';
import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Returns the jsx for the learn page.
 *
 * @returns The jsx for the learn page.
 */
export function ZLearnPage() {
  const { pkg } = useParams<{ pkg: string }>();
  const src = `docs/${pkg}.README.md`;
  const img = `images/svg/${pkg}.svg`;
  const avatar = <img className='ZPaperCard-avatar-svg ZPaperCard-avatar-xl' src={img} />;

  const api = (
    <Button className='ZLearnPage-btn-api' data-testid='ZLearnPage-btn-api' color='primary' variant='contained'>
      API
    </Button>
  );

  return (
    <Grid container={true} spacing={3} className='ZLearnPage-root' data-testid='ZLearnPage-root' justify='center'>
      <Grid item={true}>
        <ZMarkdownViewer src={src} avatar={avatar} action={api} headerText='README' subHeaderText={pkg} size='lg' />
      </Grid>
    </Grid>
  );
}
