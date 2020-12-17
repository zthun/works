import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { IZTypedoc, IZTypedocEntity } from '@zthun/works.core';
import { ZTypedocEntityViewer, ZTypedocViewer } from '@zthun/works.react';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { from, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';

/**
 * Represents the api page for a package.
 *
 * @returns The jsx that renders the api page for a package.
 */
export function ZApiPage() {
  const { pkg, enid } = useParams<{ pkg: string; enid?: string }>();
  const [typedoc, setTypedoc] = useState<IZTypedoc>(null);
  const [loading, setLoading] = useState(false);
  const hist = useHistory();
  const img = `images/svg/${pkg}.svg`;
  const entity = +enid;

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

  /**
   * Navigates back to the learn page.
   */
  function handleLearn() {
    hist.push(`/learn/${pkg}`);
  }

  /**
   * Navigates to the root api page of the package.
   */
  function handleApi() {
    hist.push(`/learn/${pkg}/api`);
  }

  /**
   * Occurs when the user clicks on an entity.
   *
   * @param entity The entity to navigate to.
   */
  function handleEntity(entity: IZTypedocEntity) {
    hist.push(`/learn/${pkg}/api/${entity.id}`);
  }

  const avatar = <img className='ZPaperCard-avatar ZPaperCard-avatar-xl' src={img} />;

  const learn = (
    <Button className='ZApiPage-btn-learn' data-testid='ZApiPage-btn-learn' color='primary' variant='contained' onClick={handleLearn}>
      Learn
    </Button>
  );

  const api = (
    <Button className='ZApiPage-btn-api' data-testid='ZApiPage-btn-api' color='secondary' variant='contained' onClick={handleApi}>
      API
    </Button>
  );

  /**
   * Creates the viewer for the given params.
   *
   * @returns The jsx for the api page main component.
   */
  function createViewer() {
    if (isNaN(entity)) {
      return <ZTypedocViewer typedoc={typedoc} loading={loading} avatar={avatar} action={learn} onEntity={handleEntity} />;
    }

    return (
      <ZTypedocEntityViewer
        entity={null}
        loading={loading}
        onEntity={handleEntity}
        action={
          <ButtonGroup>
            {learn}
            {api}
          </ButtonGroup>
        }
      />
    );
  }

  return (
    <Grid container={true} spacing={3} className='ZApiPage-root' data-testid='ZApiPage-root' justify='center'>
      <Grid item={true}>{createViewer()}</Grid>
    </Grid>
  );
}
