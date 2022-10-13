import Terminal from '@mui/icons-material/Terminal';
import { makeStyles, useWebApp, ZImageSource, ZPaperCard } from '@zthun/works.react';

import React from 'react';

const useHomePageStyles = makeStyles()(() => ({
  root: {
    margin: 'auto'
  }
}));

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZHomePage() {
  const learn = useWebApp('learn');
  const styles = useHomePageStyles();

  return (
    <ZPaperCard
      className={`ZHomePage-root ${styles.classes.root}`}
      size='xl'
      avatar={<Terminal />}
      headerText='The Works System'
      subHeaderText='Make Development Easier'
    >
      <ZImageSource src={learn?.icon} height='xl' />
      <p>Zthunworks is an application management system that is used to make building tiny applications easier.</p>
      <p>
        The works system is divided into multiple layers that make up a system that is similar to an onion architecture.
      </p>
    </ZPaperCard>
  );
}
