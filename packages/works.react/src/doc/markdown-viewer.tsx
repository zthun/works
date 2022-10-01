import { sleep } from '@zthun/works.core';
import { ZHttpRequestBuilder } from '@zthun/works.http';
import highlight from 'highlight.js';
import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { ZPaperCard } from '../card/paper-card';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentSource } from '../component/component-source.interface';
import { useHttpService } from '../http/http-service.context';
import { useSafeState } from '../state/use-safe-state';
import { makeStyles } from '../theme/make-styles';

/**
 * Represents properties for the markdown viewer.
 */
export interface IZMarkdownProps
  extends IZComponentHeader,
    IZComponentSizeable,
    IZComponentActionable,
    IZComponentSource {}

const useMarkdownViewerStyles = makeStyles()((theme) => {
  const tableBorder = `${theme.sizing.thickness.md} solid ${theme.palette.grey[400]}`;
  const colorCode = '#1e1e1e';

  const td = {
    'padding': theme.sizing.gaps.sm,
    'borderBottom': tableBorder,
    'borderRight': tableBorder,

    '&:last-child': {
      borderRight: 0
    }
  };

  return {
    markdown: {
      a: {
        textDecoration: 'none',
        color: theme.palette.primary.main
      },

      table: {
        borderSpacing: theme.sizing.gaps.none,
        border: tableBorder,

        th: {
          textAlign: 'left',
          textTransform: 'uppercase',
          color: 'gainsboro',
          backgroundColor: colorCode,
          ...td
        },

        td: td,

        tr: {
          '&:last-child': {
            td: {
              borderBottom: theme.sizing.gaps.none
            }
          }
        }
      },

      blockquote: {
        backgroundColor: 'gainsboro',
        margin: theme.sizing.gaps.none,
        padding: theme.sizing.gaps.md
      },

      // Note:  I don't know why 6em works and not 2em.
      // Just going with it for now.
      pre: {
        maxWidth: 'calc(100vw - 6em)',
        overflow: 'auto',
        background: colorCode,
        color: theme.palette.common.white,
        border: `${theme.sizing.thickness.xs} solid ${theme.palette.grey[400]}`,
        padding: theme.sizing.gaps.sm
      }
    }
  };
});

/**
 * Renders markdown files from a url or content string.
 *
 * @param props The properties for the markdown viewer.
 *
 * @returns The jsx to render a markdown file.
 */
export function ZMarkdownViewer(props: IZMarkdownProps) {
  const {
    src,
    headerText,
    subHeaderText = '',
    avatar,
    actionText,
    actionColor = 'primary',
    actionType = 'button',
    size = 'auto',
    onAction = noop
  } = props;

  const [markdown, setMarkdown] = useSafeState('');
  const http = useHttpService();
  const markdownEl = useRef<HTMLDivElement>(null);
  const styles = useMarkdownViewerStyles();

  useEffect(() => {
    loadMarkdown();
  }, [src]);

  useEffect(() => {
    highlightMarkdown();
  }, [markdownEl.current]);

  /**
   * Runs the markdown code highlighting.
   */
  async function highlightMarkdown() {
    // ReactMarkdown sometimes needs a bit of time to refresh before running the highlight.
    await sleep(10);
    markdownEl.current?.querySelectorAll('code').forEach((block) => highlight.highlightElement(block));
  }

  /**
   * Loads the markdown into this viewer.
   */
  async function loadMarkdown() {
    setMarkdown('');

    if (src == null) {
      return;
    }

    const request = new ZHttpRequestBuilder().get().url(src).build();

    try {
      const { data } = await http.request<string>(request);
      setMarkdown(data);
      await highlightMarkdown();
    } catch (err) {
      setMarkdown(`Unable to retrieve ${src}.  ${err.data}.`);
    }
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
        <ReactMarkdown
          className={`ZMarkdownViewer-markdown ${styles.classes.markdown}`}
          remarkPlugins={[gfm]}
          linkTarget='_blank'
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </ZPaperCard>
  );
}
