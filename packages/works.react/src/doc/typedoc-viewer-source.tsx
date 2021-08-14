import { Typography } from '@material-ui/core';
import { IZTypedoc } from '@zthun/works.core';
import { ZHttpRequestBuilder } from '@zthun/works.http';
import { first, noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { from, of, Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { ZPaperCard } from '../card/paper-card';
import { useHttpService } from '../http/http-service.context';
import { ZTypedocEntityViewer } from './typedoc-entity-viewer';
import { ZTypedocViewer } from './typedoc-viewer';
import { IZTypedocViewerSourceProps } from './typedoc-viewer-source.props';

/**
 * Represents a typedoc viewer that can load an external typedoc source.
 *
 * The arguments passed to the properties determine what is displayed for the viewer.
 *
 * @param props The properties for this viewer.
 *
 * @returns The jsx that renders the component.
 */
export function ZTypedocViewerSource(props: IZTypedocViewerSourceProps) {
  const http = useHttpService();
  const [typedoc, setTypedoc] = useState<IZTypedoc>(null);
  const [loading, setLoading] = useState(false);

  useEffect(loadTypedoc, [props.src]);

  /**
   * Loads the typedoc information into this viewer.
   *
   * @returns A callback that cleans up the current markdown load.
   */
  function loadTypedoc() {
    const canceled = new Subject<any>();
    const req = new ZHttpRequestBuilder().get().url(props.src).build();
    setLoading(true);
    from(http.request(req))
      .pipe(
        takeUntil(canceled),
        map((res) => res.data),
        finalize(() => setLoading(false)),
        catchError(() => of(null))
      )
      .subscribe((td) => setTypedoc(td));

    return () => {
      canceled.next(undefined);
      canceled.complete();
    };
  }

  if (typedoc == null) {
    return (
      <ZPaperCard loading={loading} {...props}>
        <Typography data-testid='ZTypedocViewer-no-typedoc-loaded' variant='body2'>
          No typedoc has been loaded or the typedoc could not be loaded.
        </Typography>
      </ZPaperCard>
    );
  }

  if (props.entityId == null || isNaN(props.entityId)) {
    return <ZTypedocViewer typedoc={typedoc} {...props} />;
  }

  const entity = first(typedoc.children.filter((ch) => ch.id === props.entityId));

  if (entity == null) {
    return (
      <ZPaperCard {...props}>
        <Typography data-testid='ZTypedocViewer-no-entity-found' variant='body2'>
          No entity with id, {props.entityId}, was found.
        </Typography>
      </ZPaperCard>
    );
  }

  return <ZTypedocEntityViewer entity={entity} {...props} />;
}

ZTypedocViewerSource.defaultProps = {
  headerText: 'Typedoc',
  avatar: null,
  entityId: null,

  actionText: null,
  actionType: 'button',
  actionColor: 'primary',

  onAction: noop,
  onEntity: noop
};
