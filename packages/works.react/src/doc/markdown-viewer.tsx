import Axios from 'axios';
import highlight from 'highlight.js';
import { noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { from, of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { ZPaperCard } from '../card/paper-card';
import { IZMarkdownProps } from './markdown.props';

/**
 * Renders markdown files from a url or content string.
 *
 * @param props The properties for the markdown viewer.
 *
 * @returns The jsx to render a markdown file.
 */
export function ZMarkdownViewer(props: IZMarkdownProps) {
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
        markdownEl.current.querySelectorAll('code').forEach((block) => highlight.highlightElement(block));
      });

    return () => {
      canceled.next(undefined);
      canceled.complete();
    };
  }

  return (
    <ZPaperCard
      className='ZMarkdownViewer-root'
      data-testid='ZMarkdownViewer-root'
      headerText={props.headerText}
      subHeaderText={props.subHeaderText}
      avatar={props.avatar}
      actionText={props.actionText}
      actionColor={props.actionColor}
      size={props.size}
      loading={!markdown}
      onAction={props.onAction}
    >
      <div ref={markdownEl}>
        <ReactMarkdown className='ZMarkdownViewer-markdown' remarkPlugins={[gfm]} linkTarget='_blank'>
          {markdown}
        </ReactMarkdown>
      </div>
    </ZPaperCard>
  );
}

ZMarkdownViewer.defaultProps = {
  actionText: null,
  actionColor: 'primary',
  actionType: 'button',
  onAction: noop
};
