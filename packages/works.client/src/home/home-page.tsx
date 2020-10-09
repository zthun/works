import { Grid } from '@material-ui/core';
import { ZSummaryCard } from '@zthun/works.react';
import React from 'react';

/**
 * Renders the home page.
 */
export function ZHomePage() {
  return (
    <Grid container={true} spacing={3} className='ZHomePage-root' data-testid='ZHomePage-root' justify='center'>
      <Grid item={true}>
        <ZSummaryCard title='React Components' imageUrl='/images/svg/react.svg'>
          Zthunworks&apos; client is built in React and offers a library of components for those who want to use some of the functionality found here.
        </ZSummaryCard>
      </Grid>
      <Grid item={true}>
        <ZSummaryCard title='Nest Services' imageUrl='/images/svg/nestjs.svg'>
          Zthunworks is made up of shared services built using nestjs. The services packages contains reusable modules that can be used to quickly set up distributed services for other websites.
        </ZSummaryCard>
      </Grid>
      <Grid item={true}>
        <ZSummaryCard title='Core Contracts' imageUrl='images/svg/javascript.svg'>
          Zthunworks has a shared layer of common functionality across the client and the server that is separated into a framework-agnostic package for anyone to consume.
        </ZSummaryCard>
      </Grid>
    </Grid>
  );
}
