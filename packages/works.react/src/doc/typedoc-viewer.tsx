import React from 'react';
import { IZTypedocViewerProps } from './typedoc-viewer.props';

/**
 * Represents a viewer for typedoc json files.
 *
 * @param props The properties for this viewer.
 *
 * @returns The jsx for a typedoc viewer.
 */
export function ZTypedocViewer(props: IZTypedocViewerProps) {
  return <div data-testid='ZTypedocViewer-root'>Typedoc viewer: {props.src}</div>;
}
