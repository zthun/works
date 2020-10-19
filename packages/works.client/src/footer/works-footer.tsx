import { IconButton, Toolbar } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';

/**
 * Renders the footer for the zthunworks site.
 *
 * @returns The jsx for the footer.
 */
export function ZthunworksFooter() {
  /**
   * Opens the github for zthunworks.
   */
  function openGithub() {
    window.open('https://github.com/zthun/works', '_blank');
  }

  return (
    <footer className='ZthunworksFooter-root' data-testid='ZthunworksFooter-root'>
      <Toolbar>
        <IconButton className='ZthunworksFooter-btn-github' data-testid='ZthunworksFooter-btn-github' color='inherit' onClick={openGithub}>
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </footer>
  );
}
