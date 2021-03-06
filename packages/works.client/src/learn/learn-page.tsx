import { Grid } from '@material-ui/core';
import { ZMarkdownViewer } from '@zthun/works.react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

/**
 * Returns the jsx for the learn page.
 *
 * @returns The jsx for the learn page.
 */
export function ZLearnPage() {
  const hist = useHistory();
  const { pkg } = useParams<{ pkg: string }>();
  const src = `docs/${pkg}.README.md`;
  const img = `images/svg/${pkg}.svg`;
  const avatar = <img className='ZPaperCard-avatar ZPaperCard-avatar-xl' src={img} />;

  /**
   * Occurs when the api button is clicked.
   */
  function handleApi() {
    hist.push(`/learn/${pkg}/api`);
  }

  return (
    <Grid container={true} spacing={3} className='ZLearnPage-root' data-testid='ZLearnPage-root' justify='center'>
      <Grid item={true}>
        <ZMarkdownViewer src={src} avatar={avatar} actionText='View the API' onAction={handleApi} headerText='README' subHeaderText={pkg} size='lg' />
      </Grid>
    </Grid>
  );
}
