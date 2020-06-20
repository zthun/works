import { Grid } from '@material-ui/core';
import { ZElevatedMediaCard } from '@zthun/works.react';
import React from 'react';

export function ZHomePage() {
  return (
    <Grid container={true} spacing={3} className='ZHomePage-root' justify='center'>
      <Grid item={true}>
        <ZElevatedMediaCard title='React Components' imageUrl='/images/svg/react.svg'>
          The Zthunworks client is built in React and offers a library of components for those who want to use some of the functionality found here.
        </ZElevatedMediaCard>
      </Grid>
      <Grid item={true}>
        <ZElevatedMediaCard title='Nest Services' imageUrl='/images/svg/nestjs.svg'>
          Zthunworks is made up of shared services built using nestjs. The nestjs services packages contains reusable modules that can be used to quickly set up services.
        </ZElevatedMediaCard>
      </Grid>
      <Grid item={true}>
        <ZElevatedMediaCard title='Core Contracts' imageUrl='images/svg/javascript.svg'>
          Zthunworks has a shared layer of common functionality across the client and the server that is separated into a simple, framework agnostic package for anyone to consume.
        </ZElevatedMediaCard>
      </Grid>
    </Grid>
  );
}
