import { Grid, Typography } from '@material-ui/core';
import { ZPaperCard } from '@zthun/works.react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

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

  const imgDimension = 'lg';
  const size = 'sm';
  const library = <LocalLibraryIcon fontSize='large' />;
  const learnMore = 'Learn More...';
  const learnReactComponents = learn.bind(null, 'works.react');
  const learnNestServices = learn.bind(null, 'works.nest');
  const learnCoreContracts = learn.bind(null, 'works.core');

  return (
    <Grid container={true} spacing={3} className='ZHomePage-root' data-testid='ZHomePage-root' justify='center'>
      <Grid item={true} data-testid='ZHomePage-learn-react-components'>
        <ZPaperCard headerText='React' subHeaderText='@zthun/works.react' imageUrl='/images/svg/works.react.svg' imageHeight={imgDimension} size={size} avatar={library} actionText={learnMore} onAction={learnReactComponents}>
          <Typography className='ZHomePage-summary-text'>Zthunworks&apos; client is built in React and offers a library of components for those who want to use some of the functionality found here.</Typography>
        </ZPaperCard>
      </Grid>
      <Grid item={true} data-testid='ZHomePage-learn-nest-services'>
        <ZPaperCard headerText='Nest' subHeaderText='@zthun/works.nest' imageUrl='/images/svg/works.nest.svg' imageHeight={imgDimension} size={size} avatar={library} actionText={learnMore} onAction={learnNestServices}>
          <Typography className='ZHomePage-summary-text'>Zthunworks is made up of shared services built using nestjs. The services packages contains reusable modules that can be used to quickly set up distributed services for other websites.</Typography>
        </ZPaperCard>
      </Grid>
      <Grid item={true} data-testid='ZHomePage-learn-core-contracts'>
        <ZPaperCard headerText='Core' subHeaderText='@zthun/works.core' imageUrl='images/svg/works.core.svg' imageHeight={imgDimension} size={size} avatar={library} actionText={learnMore} onAction={learnCoreContracts}>
          <Typography className='ZHomePage-summary-text'>Zthunworks has a shared layer of common functionality across the client and the server that is separated into a framework-agnostic package for anyone to consume.</Typography>
        </ZPaperCard>
      </Grid>
    </Grid>
  );
}
