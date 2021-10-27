import { Typography } from '@mui/material';
import { IZTypedoc, IZTypedocEntity } from '@zthun/works.core';
import { ZHttpRequestBuilder } from '@zthun/works.http';
import { first } from 'lodash';
import React, { useEffect, useState } from 'react';
import { from, of, Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { ZPaperCard } from '../card/paper-card';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentSource } from '../component/component-source.interface';
import { useHttpService } from '../http/http-service.context';
import { ZTypedocEntityViewer } from './typedoc-entity-viewer';
import { ZTypedocViewer } from './typedoc-viewer';

/**
 * Represents properties for the ZTypedocViewerSource component.
 */
export interface IZTypedocViewerSourceProps extends Partial<IZComponentHeader>, IZComponentSizeable, IZComponentActionable, IZComponentSource, IZComponentEntityRedirect<IZTypedocEntity | number> {
  /**
   * The optional entity id to display.
   *
   * If this is defined, then the component for an individual entity is loaded
   * instead of the root typedoc.
   */
  entityId: number;
}

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
  const { src, entityId, headerText = 'Typedoc' } = props;

  const http = useHttpService();
  const [typedoc, setTypedoc] = useState<IZTypedoc>(null);
  const [loading, setLoading] = useState(false);

  useEffect(loadTypedoc, [src]);

  /**
   * Loads the typedoc information into this viewer.
   *
   * @returns A callback that cleans up the current markdown load.
   */
  function loadTypedoc() {
    const canceled = new Subject<any>();
    const req = new ZHttpRequestBuilder().get().url(src).build();
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
      <ZPaperCard loading={loading} {...props} headerText={headerText}>
        <Typography data-testid='ZTypedocViewer-no-typedoc-loaded' variant='body2'>
          No typedoc has been loaded or the typedoc could not be loaded.
        </Typography>
      </ZPaperCard>
    );
  }

  if (entityId == null || isNaN(entityId)) {
    return <ZTypedocViewer typedoc={typedoc} {...props} />;
  }

  const entity = first(typedoc.children.filter((ch) => ch.id === entityId));

  if (entity == null) {
    return (
      <ZPaperCard {...props} headerText={headerText}>
        <Typography data-testid='ZTypedocViewer-no-entity-found' variant='body2'>
          No entity with id, {entityId}, was found.
        </Typography>
      </ZPaperCard>
    );
  }

  return <ZTypedocEntityViewer entity={entity} {...props} />;
}
