import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ZCircularProgress } from '../common/circular-progress';
import { ZPaperCard } from '../common/paper-card';
import { IZMarkdownViewerProps } from './markdown-viewer.props';
import Axios from 'axios';
import gfm from 'remark-gfm';

/**
 * Renders markdown files from a url or content string.
 *
 * @param props The properties for the markdown viewer.
 *
 * @returns The jsx to render a markdown file.
 */
export function ZMarkdownViewer(props: IZMarkdownViewerProps) {
  const [markdown, setMarkdown] = useState('');

  useEffect(loadMarkdown, [props.url]);

  /**
   * Loads the markdown into this viewer.
   */
  function loadMarkdown() {
    setMarkdown('');
    Axios.get(props.url)
      .then((res) => res.data)
      .catch((err) => `Unable to retrieve ${props.url}.  ${err}.`)
      .then((md) => setMarkdown(md));
  }

  return (
    <ZPaperCard className='ZMarkdownViewer-root' headerText={props.headerText} subHeaderText={props.subHeaderText} avatar={props.avatar} action={<ZCircularProgress show={!markdown} size='2em'></ZCircularProgress>}>
      <ReactMarkdown plugins={[gfm]}>{markdown}</ReactMarkdown>
    </ZPaperCard>
  );
}
