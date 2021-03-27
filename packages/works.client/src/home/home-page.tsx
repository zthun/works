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

  const learnReact = learn.bind(null, 'works.react');
  const learnNest = learn.bind(null, 'works.nest');
  const learnCore = learn.bind(null, 'works.core');
  const learnDal = learn.bind(null, 'works.dal');
  const learnUrl = learn.bind(null, 'works.url');
  const learnDraw = learn.bind(null, 'works.draw');
  const learnJest = learn.bind(null, 'works.jest');

  /**
   * Creates an individual learn item.
   *
   * @param pkg The id of the package.
   * @param name The name of the package.
   * @param description The text description of the package.
   * @param onAction The action to take when the user clicks the learn more button.
   *
   * @returns The jsx for the individual grid item.
   */
  function createLearn(pkg: string, name: string, description: string, onAction: () => void) {
    return (
      <Grid item={true} className={`ZHomePage-learn ZHomePage-learn-${pkg}`} data-testid={`ZHomePage-learn-${pkg}`} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ZPaperCard headerText={name} subHeaderText={`@zthun/works.${pkg}`} imageUrl={`/images/svg/works.${pkg}.svg`} imageHeight='lg' size='auto' avatar={<LocalLibraryIcon fontSize='large' />} actionText='Learn More...' onAction={onAction}>
          <Typography className='ZHomePage-summary-text'>{description}</Typography>
        </ZPaperCard>
      </Grid>
    );
  }

  return (
    <Grid container={true} spacing={3} className='ZHomePage-root' data-testid='ZHomePage-root'>
      {createLearn('react', 'React', 'The Zthunworks client is built in React and offers a library of components for those who want to use some of the functionality found here.', learnReact)}
      {createLearn('nest', 'Nest', 'Zthunworks is made up of shared services built using nestjs. The services packages contains reusable modules that can be used to quickly set up distributed services for other websites.', learnNest)}
      {createLearn('core', 'Core', 'Zthunworks has a shared layer of common functionality across the client and the server that is separated into a framework-agnostic package for anyone to consume.', learnCore)}
      {createLearn('dal', 'Data Access', 'Zthunworks uses mongodb for data data access for quick adaptability, fast schema changes, and standardized apis which is not susceptible to injection attacks.', learnDal)}
      {createLearn('url', 'URL', 'When making asynchronous calls, you will often need to build out URL paths out of parts. Zthunworks has just the package to do this using the builder pattern.', learnUrl)}
      {createLearn('draw', 'Draw', 'Need to draw to an HTML5 canvas? Using a printable layering model with transformation support makes that much easier.', learnDraw)}
      {createLearn('jest', 'Jest', 'Zthunworks unit testing framework of choice is Jest for its amazing tooling and speed. The jest packages adds some minor functionality to enhance the experience.', learnJest)}
    </Grid>
  );
}
