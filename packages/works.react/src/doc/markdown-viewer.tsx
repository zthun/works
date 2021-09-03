import { IZHttpResult, ZHttpRequestBuilder } from '@zthun/works.http';
import highlight from 'highlight.js';
import { noop } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { from, of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { ZPaperCard } from '../card/paper-card';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentSource } from '../component/component-source.interface';
import { useHttpService } from '../http/http-service.context';

/**
 * Represents properties for the markdown viewer.
 */
export interface IZMarkdownProps extends IZComponentHeader, IZComponentSizeable, IZComponentActionable, IZComponentSource {}

/**
 * Renders markdown files from a url or content string.
 *
 * @param props The properties for the markdown viewer.
 *
 * @returns The jsx to render a markdown file.
 */
export function ZMarkdownViewer(props: IZMarkdownProps) {
  const { src, headerText, subHeaderText = '', avatar = null, actionText = null, actionColor = 'primary', actionType = 'button', size = 'auto', onAction = noop } = props;

  const [markdown, setMarkdown] = useState('');
  const http = useHttpService();
  const markdownEl = useRef<HTMLDivElement>();

  useEffect(loadMarkdown, [src]);

  /**
   * Loads the markdown into this viewer.
   *
   * @returns A callback that cleans up the current markdown load.
   */
  function loadMarkdown() {
    const canceled = new Subject<any>();
    setMarkdown('');

    const request = new ZHttpRequestBuilder().get().url(src).build();

    from(http.request<string>(request))
      .pipe(
        takeUntil(canceled),
        map((res) => res.data),
        catchError((err: IZHttpResult) => of(`Unable to retrieve ${src}.  ${err.data}.`))
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
      headerText={headerText}
      subHeaderText={subHeaderText}
      avatar={avatar}
      actionText={actionText}
      actionType={actionType}
      actionColor={actionColor}
      size={size}
      loading={!markdown}
      onAction={onAction}
    >
      <div ref={markdownEl}>
        <ReactMarkdown className='ZMarkdownViewer-markdown' remarkPlugins={[gfm]} linkTarget='_blank'>
          {markdown}
        </ReactMarkdown>
      </div>
    </ZPaperCard>
  );
}
