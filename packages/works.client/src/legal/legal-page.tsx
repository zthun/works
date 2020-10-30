import { Grid } from '@material-ui/core';
import { ZMarkdownViewer } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import InfoIcon from '@material-ui/icons/Info';
import React, { useState } from 'react';

/**
 * Renders the legal page.
 *
 * @returns The jsx to render the legal page.
 */
export function ZLegalPage() {
  const [privacy] = useState(new ZUrlBuilder().location().hash('').path('legal/PRIVACY.md').build());

  return (
    <Grid container className='ZLegalPage-root' data-testid='ZLegalPage-root' spacing={3} justify='center'>
      <ZMarkdownViewer url={privacy} headerText='Privacy' subHeaderText='Information collection' avatar={<InfoIcon fontSize='large' />} size='lg'></ZMarkdownViewer>
    </Grid>
  );
}
