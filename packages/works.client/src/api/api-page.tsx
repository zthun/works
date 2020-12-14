import { Grid } from '@material-ui/core';
import { ZTypedocViewer } from '@zthun/works.react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { from, Subject } from 'rxjs';
import Axios from 'axios';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { IZTypedoc } from '@zthun/works.core';

/**
 * Represents the api page for a package.
 *
 * @returns The jsx that renders the api page for a package.
 */
export function ZApiPage() {
  const { pkg } = useParams<{ pkg: string }>();
  const [typedoc, setTypedoc] = useState<IZTypedoc>(null);
  const [loading, setLoading] = useState(false);
  const img = `images/svg/${pkg}.svg`;
  const avatar = <img className='ZPaperCard-avatar ZPaperCard-avatar-xl' src={img} />;

  useEffect(loadTypedoc, [pkg]);

  /**
   * Loads the markdown into this viewer.
   *
   * @returns A callback that cleans up the current markdown load.
   */
  function loadTypedoc() {
    const canceled = new Subject<any>();
    const src = `docs/${pkg}.typedoc.json`;
    setLoading(true);

    from(Axios.get<IZTypedoc>(src))
      .pipe(
        takeUntil(canceled),
        map((res) => res.data),
        finalize(() => setLoading(false))
      )
      .subscribe((td) => setTypedoc(td));

    return () => {
      canceled.next();
      canceled.complete();
    };
  }

  return (
    <Grid container={true} spacing={3} className='ZApiPage-root' data-testid='ZApiPage-root' justify='center'>
      <Grid item={true}>
        <ZTypedocViewer typedoc={typedoc} loading={loading} avatar={avatar} />
      </Grid>
    </Grid>
  );
}
