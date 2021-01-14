import { Typography } from '@material-ui/core';
import { ZTypedocTypeKind } from '@zthun/works.core';
import { noop } from 'lodash';
import React, { Fragment } from 'react';
import { IZTypedocTypeViewerProps } from './typedoc-type-viewer.props';

/**
 * Constructs the jsx for the typedoc type viewer.
 *
 * @param props The properties for this viewer.
 *
 * @returns The jsx for the type viewer.
 */
export function ZTypedocTypeViewer(props: IZTypedocTypeViewerProps) {
  const variant = 'body2';
  const component = 'span';

  /**
   * Occurs when the user clicks on another entity.
   *
   * @param e The mouse event.
   */
  function handleReference(e: any) {
    const element = e.target as HTMLElement;
    const id = +element.getAttribute('data-entity');
    props.onReference(id);
  }

  /**
   * Creates the jsx for the generic arguments.
   *
   * @returns The jsx for generic arguments.
   */
  function createGenericArguments() {
    if (!props.type.typeArguments) {
      return null;
    }

    const args = props.type.typeArguments;
    return (
      <Typography variant={variant} component={component}>
        &lt;
        {props.type.typeArguments.map((ty, i) => (
          <ZTypedocTypeViewer key={i} type={ty} onReference={props.onReference} separator={i < args.length - 1 ? ', ' : null} />
        ))}
        &gt;
      </Typography>
    );
  }

  /**
   * Creates the most basic type element jsx.
   *
   * @returns The jsx for an intrinsic element.
   */
  function createIntrinsicElement() {
    return (
      <Fragment>
        <Typography variant={variant} component={component} className='ZTypedocTypeViewer-title'>
          {props.type.name}
        </Typography>
        {createGenericArguments()}
      </Fragment>
    );
  }

  /**
   * Creates a type element for an array.
   *
   * @returns The jsx for an array.
   */
  function createArrayElement() {
    return <ZTypedocTypeViewer type={props.type.elementType} onReference={props.onReference} separator='[]' />;
  }

  /**
   * Creates the reference type jsx.
   *
   * @returns The jsx for a reference type element.
   */
  function createReferenceElement() {
    if (props.type.id == null) {
      return createIntrinsicElement();
    }

    return (
      <Fragment>
        <a className='ZTypedocTypeViewer-title' data-entity={props.type.id} onClick={handleReference}>
          {props.type.name}
        </a>
        {createGenericArguments()}
      </Fragment>
    );
  }

  /**
   * Creates the jsx for a union type.
   *
   * @returns The jsx for a union type.
   */
  function createUnionElement() {
    return props.type.types.map((ty, i) => <ZTypedocTypeViewer key={i} type={ty} onReference={props.onReference} separator={i < props.type.types.length - 1 ? ' | ' : null} />);
  }

  /**
   * Creates the under element based on the type's type.
   *
   * @returns The jsx for the type.
   */
  function createTypeElement() {
    switch (props.type.type) {
      case ZTypedocTypeKind.Array:
        return createArrayElement();
      case ZTypedocTypeKind.Reference:
        return createReferenceElement();
      case ZTypedocTypeKind.Union:
        return createUnionElement();
      default:
        return createIntrinsicElement();
    }
  }

  /**
   * Creates the type header.
   *
   * @returns The jsx for the type header.
   */
  function createHeader() {
    return props.header ? (
      <Typography variant={variant} component={component} className='ZTypedocTypeViewer-header'>
        {props.header}
      </Typography>
    ) : null;
  }

  /**
   * Creates the type separator.
   *
   * @returns The jsx for the type separator.
   */
  function createSeparator() {
    return props.separator ? (
      <Typography variant={variant} component={component} className='ZTypedocTypeViewer-separator'>
        {props.separator}
      </Typography>
    ) : null;
  }

  if (!props.type) {
    return null;
  }

  return (
    <div className='ZTypedocTypeViewer-root' data-testid='ZTypedocTypeViewer-root'>
      {createHeader()}
      {createTypeElement()}
      {createSeparator()}
    </div>
  );
}

ZTypedocTypeViewer.defaultProps = {
  separator: null,
  header: null,
  onReference: noop
};
