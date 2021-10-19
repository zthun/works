import { Grid } from '@mui/material';
import React from 'react';
import { IZMarkdownProps, ZMarkdownViewer } from './markdown-viewer';

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

/**
 * Returns the jsx for rendering a full markdown page.
 *
 * @param props The properties to pass through to the markdown page.
 *
 * @returns The jsx that renders the entire markdown page.
 */
export function renderMarkdownPage(props: IZMarkdownProps) {
  return <ZMarkdownPage {...props} />;
}
