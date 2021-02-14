import { noop } from 'lodash';
import React, { Fragment } from 'react';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { IZTypedocTypeListViewerProps } from './typedoc-type-list-viewer.props';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Renders a type list.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for a type list.
 */
export function ZTypedocTypeListViewer(props: IZTypedocTypeListViewerProps) {
  if (!props.types || !props.types.length) {
    return null;
  }

  /**
   * Creates the main component flow.
   *
   * @returns The main jsx flow.
   */
  function createFlow() {
    return (
      <Fragment>
        {createTypedocTypography(props.prefix, props.prefixContainer, undefined, 'ZTypedocTypeListViewer-keyword')}
        {props.types.map((ty, i) => (
          <ZTypedocTypeViewer key={i} type={ty} container={props.container} onReference={props.onEntity} suffix={i === props.types.length - 1 ? null : props.separator} />
        ))}
        {createTypedocTypography(props.suffix, props.suffixContainer, undefined, 'ZTypedocTypeListViewer-keyword')}
      </Fragment>
    );
  }

  /**
   * Creates the main component flow inside of the root container.
   *
   * @returns The jsx for the main flow wrapped by the root container.
   */
  function createContainerFlow() {
    return (
      <div className='ZTypedocTypeListViewer-root' data-testid='ZTypedocTypeListViewer-root'>
        {createFlow()}
      </div>
    );
  }

  return props.container ? createContainerFlow() : createFlow();
}

ZTypedocTypeListViewer.defaultProps = {
  prefix: null,
  prefixContainer: 'span',
  suffix: null,
  suffixContainer: 'span',
  separator: ', ',
  container: true,
  onEntity: noop
};
