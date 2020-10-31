import { Grid } from '@material-ui/core';
import { ZMarkdownViewer } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import MouseIcon from '@material-ui/icons/Mouse';
import React, { useState } from 'react';

/**
 * Renders the terms page.
 *
 * @returns The jsx to render the terms page.
 */
export function ZTermsPage() {
  const [privacy] = useState(new ZUrlBuilder().location().hash('').path('legal/TERMS.md').build());

  return (
    <Grid container className='ZTermsPage-root' data-testid='ZTermsPage-root' spacing={3} justify='center'>
      <ZMarkdownViewer src={privacy} headerText='Terms' subHeaderText='Usage of this website' avatar={<MouseIcon fontSize='large' />} size='lg'></ZMarkdownViewer>
    </Grid>
  );
}
