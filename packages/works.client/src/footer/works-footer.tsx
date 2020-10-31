import { IconButton, Toolbar } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import MouseIcon from '@material-ui/icons/Mouse';
import React from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Renders the footer for the zthunworks site.
 *
 * @returns The jsx for the footer.
 */
export function ZthunworksFooter() {
  const history = useHistory();

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

  /**
   * Opens the privacy route.
   */
  function openPrivacy() {
    history.push('/privacy');
  }

  /**
   * Opens the terms route.
   */
  function openTerms() {
    history.push('/terms');
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
        <IconButton className='ZthunworksFooter-btn-privacy' data-testid='ZthunworksFooter-btn-privacy' title='Privacy' color='inherit' onClick={openPrivacy}>
          <InfoIcon />
        </IconButton>
        <IconButton className='ZthunworksFooter-btn-terms' data-testid='ZthunworksFooter-btn-terms' title='Terms of Use' color='inherit' onClick={openTerms}>
          <MouseIcon />
        </IconButton>
      </Toolbar>
    </footer>
  );
}
