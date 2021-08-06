import { Grid } from '@material-ui/core';
import { IZTypedocEntity } from '@zthun/works.core';
import { ZTypedocViewerSource } from '@zthun/works.react';
import { get } from 'lodash';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

/**
 * Represents the api page for a package.
 *
 * @returns The jsx that renders the api page for a package.
 */
export function ZApiPage() {
  const { pkg, enid } = useParams<{ pkg: string; enid?: string }>();
  const hist = useHistory();
  const img = `images/svg/${pkg}.svg`;
  const src = `docs/${pkg}.typedoc.json`;
  const entityId = +enid;

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
  function handleEntity(entity: IZTypedocEntity | number) {
    const id = get(entity, 'id', entity);
    hist.push(`/learn/${pkg}/api/${id}`);
  }

  const avatar = <img className='ZPaperCard-avatar ZPaperCard-avatar-xl' src={img} />;
  const actionText = entityId ? 'Back to API' : 'Back to README';
  const handleAction = entityId ? handleApi : handleLearn;

  return (
    <Grid container={true} spacing={3} className='ZApiPage-root' data-testid='ZApiPage-root' justifyContent='center'>
      <Grid item={true}>
        <ZTypedocViewerSource src={src} avatar={avatar} actionText={actionText} entityId={entityId} onAction={handleAction} onEntity={handleEntity} />
      </Grid>
    </Grid>
  );
}
