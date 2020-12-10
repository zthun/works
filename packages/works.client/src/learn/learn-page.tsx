import { Grid } from '@material-ui/core';
import { ZMarkdownViewer } from '@zthun/works.react';
import React from 'react';
import { useParams } from 'react-router-dom';
import DescriptionIcon from '@material-ui/icons/Description';

/**
 * Returns the jsx for the learn page.
 *
 * @returns The jsx for the learn page.
 */
export function ZLearnPage() {
  const { pkg } = useParams<{ pkg: string }>();
  const src = `docs/${pkg}.README.md`;

  return (
    <Grid container={true} spacing={3} className='ZLearnPage-root' data-testid='ZLearnPage-root' justify='center'>
      <ZMarkdownViewer src={src} headerText='README' subHeaderText='General information' avatar={<DescriptionIcon fontSize='large' />} size='lg' />
    </Grid>
  );
}
