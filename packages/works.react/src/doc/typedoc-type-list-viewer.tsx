import { IZTypedocType } from '@zthun/works.core';
import React, { ElementType, Fragment, ReactNode } from 'react';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { useTypedocTypeViewerStyles, ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Represents properties for the ZTypedocTypeListViewer component.
 */
export interface IZTypedocTypeListViewerProps extends IZComponentEntityRedirect<number> {
  /**
   * The list of types to render.
   */
  types: IZTypedocType[];

  /**
   * The optional prefix.
   */
  prefix?: ReactNode;

  /**
   * The optional suffix.
   */
  suffix?: ReactNode;

  /**
   * How to render the prefix node.
   *
   * @default 'span'
   */
  prefixContainer?: ElementType<any>;

  /**
   * How to render the suffix.
   *
   * @default 'span'
   */
  suffixContainer?: ElementType<any>;

  /**
   * The optional separator.
   */
  separator?: ReactNode;

  /**
   * A flag that determines whether or not to show the component in a root container or to inject it inline with a fragment root.
   */
  container?: boolean;
}

/**
 * Renders a type list.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for a type list.
 */
export function ZTypedocTypeListViewer(props: IZTypedocTypeListViewerProps) {
  const { types, prefix, prefixContainer = 'span', suffix, suffixContainer = 'span', separator = ', ', container = true, onEntity } = props;
  const styles = useTypedocTypeViewerStyles();

  if (!types || !types.length) {
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
        {createTypedocTypography(prefix, prefixContainer, undefined, `ZTypedocTypeListViewer-keyword ${styles.classes.keyword}`)}
        {types.map((ty, i) => (
          <ZTypedocTypeViewer key={i} type={ty} container={container} onEntity={onEntity} suffix={i === types.length - 1 ? null : separator} />
        ))}
        {createTypedocTypography(suffix, suffixContainer, undefined, `ZTypedocTypeListViewer-keyword ${styles.classes.keyword}`)}
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
      <div className={`ZTypedocTypeListViewer-root ${styles.classes.root}`} data-testid='ZTypedocTypeListViewer-root'>
        {createFlow()}
      </div>
    );
  }

  return container ? createContainerFlow() : createFlow();
}
