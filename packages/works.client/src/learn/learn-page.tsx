import { Grid } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { ZMarkdownViewer, ZMediaCard } from '@zthun/works.react';
import React from 'react';
import { useParams } from 'react-router-dom';
import CodeIcon from '@material-ui/icons/Code';

/**
 * Returns the jsx for the learn page.
 *
 * @returns The jsx for the learn page.
 */
export function ZLearnPage() {
  const { pkg } = useParams<{ pkg: string }>();
  const src = `docs/${pkg}.README.md`;
  const img = `images/svg/${pkg}.svg`;

  return (
    <Grid container={true} spacing={3} className='ZLearnPage-root' data-testid='ZLearnPage-root' justify='center'>
      <Grid item={true}>
        <ZMarkdownViewer src={src} headerText='README' subHeaderText='Package information' avatar={<DescriptionIcon fontSize='large' />} size='lg' />
      </Grid>
      <Grid item={true}>
        <ZMediaCard headerText='Documentation' subHeaderText={pkg} imageUrl={img} actionText='View the API' avatar={<CodeIcon fontSize='large' />} />
      </Grid>
    </Grid>
  );
}
