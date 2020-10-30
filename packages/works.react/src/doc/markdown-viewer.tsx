import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { ZPaperCard } from '../common/paper-card';
import { IZMarkdownViewerProps } from './markdown-viewer.props';

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
    <ZPaperCard className='ZMarkdownViewer-root' headerText={props.headerText} subHeaderText={props.subHeaderText} avatar={props.avatar} size={props.size} loading={!markdown}>
      <ReactMarkdown plugins={[gfm]} linkTarget='_blank'>
        {markdown}
      </ReactMarkdown>
    </ZPaperCard>
  );
}
