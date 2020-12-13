import Axios from 'axios';
import { highlightBlock } from 'highlight.js';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { from, of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
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
  const markdownEl = useRef<HTMLDivElement>();

  useEffect(loadMarkdown, [props.src]);

  /**
   * Loads the markdown into this viewer.
   *
   * @returns A callback that cleans up the current markdown load.
   */
  function loadMarkdown() {
    const canceled = new Subject<any>();
    setMarkdown('');

    from(Axios.get(props.src))
      .pipe(
        takeUntil(canceled),
        map((res) => res.data),
        catchError((err) => of(`Unable to retrieve ${props.src}.  ${err}.`))
      )
      .subscribe((md) => {
        setMarkdown(md);
        markdownEl.current.querySelectorAll('code').forEach((block) => highlightBlock(block));
      });

    return () => {
      canceled.next();
      canceled.complete();
    };
  }

  return (
    <ZPaperCard className='ZMarkdownViewer-root' data-testid='ZMarkdownViewer-root' headerText={props.headerText} subHeaderText={props.subHeaderText} avatar={props.avatar} action={props.action} size={props.size} loading={!markdown}>
      <div ref={markdownEl}>
        <ReactMarkdown className='ZMarkdownViewer-markdown' plugins={[gfm]} linkTarget='_blank'>
          {markdown}
        </ReactMarkdown>
      </div>
    </ZPaperCard>
  );
}
