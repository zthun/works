import { Grid } from '@material-ui/core';
import { ZMarkdownViewer } from '@zthun/works.react';
import { ZUrlBuilder } from '@zthun/works.url';
import InfoIcon from '@material-ui/icons/Info';
import React, { useState } from 'react';

/**
 * Renders the privacy page.
 *
 * @returns The jsx to render the privacy page.
 */
export function ZPrivacyPage() {
  const [privacy] = useState(new ZUrlBuilder().location().hash('').path('legal/PRIVACY.md').build());

  return (
    <Grid container className='ZPrivacyPage-root' data-testid='ZPrivacyPage-root' spacing={3} justify='center'>
      <ZMarkdownViewer src={privacy} headerText='Privacy' subHeaderText='Information collection' avatar={<InfoIcon fontSize='large' />} size='lg'></ZMarkdownViewer>
    </Grid>
  );
}
