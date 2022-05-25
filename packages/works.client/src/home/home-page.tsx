import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Grid, Typography } from '@mui/material';
import { makeStyles, useNavigate, ZPaperCard } from '@zthun/works.react';
import { kebabCase } from 'lodash';
import React from 'react';

const useHomePageStyles = makeStyles()(() => ({
  learn: {
    display: 'flex',
    justifyContent: 'center'
  },

  summary: {
    height: '10em',
    overflow: 'auto'
  }
}));

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZHomePage() {
  const navigate = useNavigate();
  const styles = useHomePageStyles();

  /**
   * Navigates to the learn page with the given name id.
   *
   * @param name The name page to navigate to.
   */
  function learn(name: string) {
    navigate(`/learn/${name}`);
  }

  const learnReact = learn.bind(null, 'works.react');
  const learnNest = learn.bind(null, 'works.nest');
  const learnCore = learn.bind(null, 'works.core');
  const learnDal = learn.bind(null, 'works.dal');
  const learnUrl = learn.bind(null, 'works.url');
  const learnDraw = learn.bind(null, 'works.draw');
  const learnJest = learn.bind(null, 'works.jest');
  const learnLintJanitor = learn.bind(null, 'lint-janitor');

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
    const identifier = kebabCase(name);
    return (
      <Grid item={true} className={`ZHomePage-learn ZHomePage-learn-${identifier} ${styles.classes.learn}`} data-testid={`ZHomePage-learn-${identifier}`} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ZPaperCard headerText={name} subHeaderText={`@zthun/${pkg}`} imageUrl={`/images/svg/${pkg}.svg`} imageHeight='lg' size='auto' avatar={<LocalLibraryIcon fontSize='large' />} actionText='Learn More...' onAction={onAction}>
          <Typography className={`ZHomePage-summary-text ${styles.classes.summary}`}>{description}</Typography>
        </ZPaperCard>
      </Grid>
    );
  }

  return (
    <Grid container={true} spacing={3} className='ZHomePage-root' data-testid='ZHomePage-root'>
      {createLearn('works.react', 'React', 'The Zthunworks client is built in React and offers a library of components for those who want to use some of the functionality found here.', learnReact)}
      {createLearn('works.nest', 'Nest', 'Zthunworks is made up of shared services built using nestjs. The services packages contains reusable modules that can be used to quickly set up distributed services for other websites.', learnNest)}
      {createLearn('works.core', 'Core', 'Zthunworks has a shared layer of common functionality across the client and the server that is separated into a framework-agnostic package for anyone to consume.', learnCore)}
      {createLearn('works.dal', 'Data Access', 'Zthunworks uses mongodb for data data access for quick adaptability, fast schema changes, and standardized apis which is not susceptible to injection attacks.', learnDal)}
      {createLearn('works.url', 'URL', 'When making asynchronous calls, you will often need to build out URL paths out of parts. Zthunworks has just the package to do this using the builder pattern.', learnUrl)}
      {createLearn('works.draw', 'Draw', 'Need to draw to an HTML5 canvas? Using a printable layering model with transformation support makes that much easier.', learnDraw)}
      {createLearn('works.jest', 'Jest', 'Zthunworks unit testing framework of choice is Jest for its amazing tooling and speed. The jest packages adds some minor functionality to enhance the experience.', learnJest)}
      {createLearn('lint-janitor', 'Lint Janitor', 'Zthunworks offers tooling for consistent code styling and maintenance.  By using lint-janitor, you can consolidate linters into a single, centralized solution.', learnLintJanitor)}
    </Grid>
  );
}
