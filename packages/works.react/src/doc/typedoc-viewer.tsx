import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { ZCircularProgress } from '../loading/circular-progress';
import { IZTypedocViewerProps } from './typedoc-viewer.props';

/**
 * Represents a viewer for typedoc json files.
 *
 * @param props The properties for this viewer.
 *
 * @returns The jsx for a typedoc viewer.
 */
export function ZTypedocViewer(props: IZTypedocViewerProps) {
  const [search, setSearch] = useState('');

  /**
   * Occurs when a search is invoked.
   *
   * @param event The text event for the search.
   */
  function handleSearch(event: any) {
    setSearch(event.target.value);
  }

  /**
   * Creates the loading icon.
   *
   * @returns The jsx for the loading component.
   */
  function createLoading() {
    return <ZCircularProgress show={true} size='4em' />;
  }

  /**
   * Creates the message for empty typedoc.
   *
   * @returns The jsx for a falsy typedoc object.
   */
  function createEmptyTypedoc() {
    return (
      <Typography variant='h4' color='secondary'>
        No typedoc has been loaded.
      </Typography>
    );
  }

  /**
   * Creates the component for handling search.
   *
   * @returns The jsx for the search component.
   */
  function createSearch() {
    return <TextField data-testid='ZTypedocViewer-text-search' fullWidth={true} label='Search' type='text' margin='none' variant='outlined' value={search} onInput={handleSearch} />;
  }

  /**
   * Creates the component for the global typedoc object.
   *
   * @returns The jsx for the global typedoc object.
   */
  function createGlobal() {
    return null;
  }

  /**
   * Creates the root typedoc element.
   *
   * @returns The jsx for the typedoc root.
   */
  function createTypedocContent() {
    if (props.loading) {
      return createLoading();
    }

    if (props.typedoc == null) {
      createEmptyTypedoc();
    }

    return (
      <React.Fragment>
        {createSearch()}
        {createGlobal()}
      </React.Fragment>
    );
  }

  return (
    <div className='ZTypedocViewer-root'>
      <ZPaperCard className='ZTypedocViewer-root' headerText={props.headerText} subHeaderText={props.subHeaderText || props.typedoc?.name} avatar={props.avatar} action={props.action} size={props.size}>
        {createTypedocContent()}
      </ZPaperCard>
    </div>
  );
}

ZTypedocViewer.defaultProps = {
  headerText: 'API',
  avatar: null
};
