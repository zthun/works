import { Grid } from '@material-ui/core';
import { ZSummaryCard } from '@zthun/works.react';
import React from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZHomePage() {
  const hist = useHistory();

  /**
   * Navigates to the learn page with the given name id.
   *
   * @param name The name page to navigate to.
   */
  function learn(name: string) {
    hist.push(`/learn/${name}`);
  }

  const learnReactComponents = learn.bind(null, 'works.react');
  const learnNestServices = learn.bind(null, 'works.nest');
  const learnCoreContracts = learn.bind(null, 'works.core');

  return (
    <Grid container={true} spacing={3} className='ZHomePage-root' data-testid='ZHomePage-root' justify='center'>
      <Grid item={true} data-testid='ZHomePage-learn-react-components'>
        <ZSummaryCard title='React Components' imageUrl='/images/svg/react.svg' onLearnMore={learnReactComponents}>
          Zthunworks&apos; client is built in React and offers a library of components for those who want to use some of the functionality found here.
        </ZSummaryCard>
      </Grid>
      <Grid item={true} data-testid='ZHomePage-learn-nest-services'>
        <ZSummaryCard title='Nest Services' imageUrl='/images/svg/nestjs.svg' onLearnMore={learnNestServices}>
          Zthunworks is made up of shared services built using nestjs. The services packages contains reusable modules that can be used to quickly set up distributed services for other websites.
        </ZSummaryCard>
      </Grid>
      <Grid item={true} data-testid='ZHomePage-learn-core-contracts'>
        <ZSummaryCard title='Core Contracts' imageUrl='images/svg/javascript.svg' onLearnMore={learnCoreContracts}>
          Zthunworks has a shared layer of common functionality across the client and the server that is separated into a framework-agnostic package for anyone to consume.
        </ZSummaryCard>
      </Grid>
    </Grid>
  );
}
