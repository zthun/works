import { Grid } from '@material-ui/core';
import React from 'react';
import { ZMarkdownViewer } from './markdown-viewer';
import { IZMarkdownProps } from './markdown.props';

/**
 * Represents a page that displays a single markdown document.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for a markdown page.
 */
export function ZMarkdownPage(props: IZMarkdownProps) {
  return (
    <Grid container className='ZMarkdownPage-root' data-testid='ZMarkdownPage-root' spacing={3} justifyContent='center'>
      <Grid item={true}>
        <ZMarkdownViewer {...props}></ZMarkdownViewer>
      </Grid>
    </Grid>
  );
}

ZMarkdownPage.defaultProps = ZMarkdownViewer.defaultProps;
