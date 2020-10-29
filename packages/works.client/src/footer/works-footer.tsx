import { IconButton, Toolbar } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import WorkIcon from '@material-ui/icons/Work';
import MailIcon from '@material-ui/icons/Mail';
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

  /**
   * Opens the contact.
   */
  function openMail() {
    window.open('mailto:support@zthunworks.com', '_blank');
  }

  return (
    <footer className='ZthunworksFooter-root' data-testid='ZthunworksFooter-root'>
      <Toolbar>
        <IconButton className='ZthunworksFooter-btn-github' data-testid='ZthunworksFooter-btn-github' title='Github' color='inherit' onClick={openGithub}>
          <GitHubIcon />
        </IconButton>
        <IconButton className='ZthunworksFooter-btn-contact' data-testid='ZthunworksFooter-btn-contact' title='Contact' color='inherit' onClick={openMail}>
          <MailIcon />
        </IconButton>
        <IconButton className='ZthunworksFooter-btn-legal' data-testid='ZthunworksFooter-btn-legal' title='Legal' color='inherit'>
          <WorkIcon />
        </IconButton>
      </Toolbar>
    </footer>
  );
}
