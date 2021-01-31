import { Link } from '@material-ui/core';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { IZTypedocSourceLinkProps } from './typedoc-source-link.props';

/**
 * Renders a link to a source repository for code.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that renders the component.
 */
function ZTypedocSourceLink(props: IZTypedocSourceLinkProps) {
  const iconClass = 'ZTypedocSourceLink-icon';
  let url = new ZUrlBuilder();

  if (props.repo === 'github') {
    url = url.github(props.user, props.project, props.commit || props.branch, props.src?.fileName, props.src.line);
  } else {
    url = url.parse(props.repo).append(props.src.fileName);
  }

  return (
    <Link className='ZTypedocSourceLink-root' data-testid='ZTypedocSourceLink-root' href={url.build()} variant='inherit' color='primary' target={props.target}>
      {props.repo === 'github' ? <GitHubIcon className={iconClass} /> : <DeveloperBoardIcon className={iconClass} />}
    </Link>
  );
}

ZTypedocSourceLink.defaultProps = {
  repo: 'github',
  target: '_blank'
};
