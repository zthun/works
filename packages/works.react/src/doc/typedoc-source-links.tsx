import { IconButton } from '@material-ui/core';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ZUrlBuilder } from '@zthun/works.url';
import { first, get } from 'lodash';
import React, { ReactNode } from 'react';
import { IZTypedocSourceLinksProps } from './typedoc-source-links.props';

/**
 * Renders a link to a source repository for code.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that renders the component.
 */
export function ZTypedocSourceLinks(props: IZTypedocSourceLinksProps) {
  if (!get(props, 'sources.length')) {
    return null;
  }

  /**
   * Occurs when the user clicks on the link to go to the source.
   *
   * @param e The event that contains the target.
   */
  function handleOpenSource(e: any) {
    const target = e.target as HTMLElement;
    const index = +target.getAttribute('data-index');
    const src = props.sources[index];

    let url = new ZUrlBuilder();

    if (props.repo === 'github') {
      url = url.github(props.user, props.project, props.commit || props.branch, src.fileName, src.line);
    } else {
      url = url.parse(props.repo).append(src.fileName);
    }

    window.open(url.build(), '_blank');
  }

  let icon: ReactNode;
  if (props.repo === 'github') {
    icon = <GitHubIcon />;
  } else {
    icon = <DeveloperBoardIcon />;
  }

  if (props.sources.length === 1) {
    const src = first(props.sources);
    const title = `${src.fileName} (Line ${src.line})`;
    return (
      <IconButton data-index='0' title={title} onClick={handleOpenSource}>
        {icon}
      </IconButton>
    );
  }

  return null;
}

ZTypedocSourceLinks.defaultProps = {
  repo: 'github'
};
