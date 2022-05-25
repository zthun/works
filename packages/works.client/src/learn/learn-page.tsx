import { Grid } from '@mui/material';
import { useNavigate, useParams, ZCardAvatar, ZMarkdownViewer } from '@zthun/works.react';
import React from 'react';

/**
 * Returns the jsx for the learn page.
 *
 * @returns The jsx for the learn page.
 */
export function ZLearnPage() {
  const navigate = useNavigate();
  const { pkg } = useParams<{ pkg: string }>();
  const src = `docs/${pkg}.README.md`;
  const img = `images/svg/${pkg}.svg`;
  const avatar = <ZCardAvatar src={img} size='xl' />;

  return (
    <Grid container spacing={3} className='ZLearnPage-root' justifyContent='center'>
      <Grid item>
        <ZMarkdownViewer src={src} avatar={avatar} actionText='View the API' onAction={navigate.bind(null, `/learn/${pkg}/api`)} headerText='README' subHeaderText={pkg} size='lg' />
      </Grid>
    </Grid>
  );
}
