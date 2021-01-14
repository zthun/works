import { Typography } from '@material-ui/core';
import { ZTypedocTypeKind } from '@zthun/works.core';
import { noop } from 'lodash';
import React, { Fragment, ReactNode } from 'react';
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
   * Sets to choose the separator as long as the index is not at the last item.
   *
   * @param i The index current enumerated.
   * @param len The len of the array being enumerated.
   * @param postfix The text to select if i is less than len - 1.
   *
   * @returns The separator if i is less than len - 1.  Null otherwise.
   */
  function chooseIfNotLast(i: number, len: number, postfix: ReactNode): ReactNode {
    return i < len - 1 ? postfix : null;
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
    const lt = '<';
    const gt = '>';
    const separator = ', ';
    return (
      <Fragment>
        <Typography className='' variant={variant} component={component}>
          {lt}
        </Typography>
        {args.map((ty, i) => (
          <ZTypedocTypeViewer key={i} type={ty} onReference={props.onReference} suffix={chooseIfNotLast(i, args.length, separator)} />
        ))}
        <Typography variant={variant} component={component}>
          {gt}
        </Typography>
      </Fragment>
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
   * Creates a type element that has a separator keyword at the end.
   *
   * @param ending The ending separator.
   *
   * @returns The jsx for an array.
   */
  function createEndTypeElement(ending: string) {
    return <ZTypedocTypeViewer type={props.type.elementType} onReference={props.onReference} suffix={ending} />;
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
   * Creates a tuple type jsx.
   *
   * @returns The jsx for a tuple type element.
   */
  function createTupleElement() {
    const openParen = '[';
    const closeParen = ']';
    const separator = ', ';
    const elements = props.type.elements;
    return (
      <Fragment>
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {openParen}
        </Typography>
        {elements.map((ty, i) => (
          <ZTypedocTypeViewer key={i} type={ty} onReference={props.onReference} suffix={chooseIfNotLast(i, elements.length, separator)} />
        ))}
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {closeParen}
        </Typography>
      </Fragment>
    );
  }

  /**
   * Creates the jsx for a union type.
   *
   * @param separator The separator character.
   *
   * @returns The jsx for a union type.
   */
  function createJoinedElement(separator: string) {
    const types = props.type.types;
    return types.map((ty, i) => <ZTypedocTypeViewer key={i} type={ty} onReference={props.onReference} suffix={chooseIfNotLast(i, types.length, separator)} />);
  }

  /**
   * Creates the element for a conditional type.
   *
   * @returns The jsx for a conditional type.
   */
  function createConditionalElement() {
    const ext = ' extends ';
    const check = ' ? ';
    const el = ' : ';

    return (
      <Fragment>
        <ZTypedocTypeViewer type={props.type.checkType} onReference={props.onReference} />
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {ext}
        </Typography>
        <ZTypedocTypeViewer type={props.type.extendsType} onReference={props.onReference} />
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {check}
        </Typography>
        <ZTypedocTypeViewer type={props.type.trueType} onReference={props.onReference} />
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {el}
        </Typography>
        <ZTypedocTypeViewer type={props.type.falseType} onReference={props.onReference} />
      </Fragment>
    );
  }

  /**
   * Creates a predicate type element.
   *
   * @returns The jsx for a predicate element.
   */
  function createPredicateElement() {
    const chk = ' is ';
    return (
      <Fragment>
        {createIntrinsicElement()}
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {chk}
        </Typography>
        <ZTypedocTypeViewer type={props.type.targetType} onReference={props.onReference} />
      </Fragment>
    );
  }

  /**
   * Creates an index access type element.
   *
   * @returns The jsx for an index access element.
   */
  function createIndexAccess() {
    const parenOpen = '(';
    const parenClose = ')';
    const bracketOpen = '[';
    const bracketClose = ']';

    return (
      <Fragment>
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {parenOpen}
        </Typography>
        <ZTypedocTypeViewer type={props.type.objectType} onReference={props.onReference} />
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {parenClose}
          {bracketOpen}
        </Typography>
        <ZTypedocTypeViewer type={props.type.indexType} onReference={props.onReference} />
        <Typography className='ZTypedocTypeViewer-keyword' variant={variant} component={component}>
          {bracketClose}
        </Typography>
      </Fragment>
    );
  }

  /**
   * Creates the under element based on the type's type.
   *
   * @returns The jsx for the type.
   */
  function createTypeElement() {
    switch (props.type.type) {
      case ZTypedocTypeKind.Array:
        return createEndTypeElement('[]');
      case ZTypedocTypeKind.Optional:
        return createEndTypeElement('?');
      case ZTypedocTypeKind.Conditional:
        return createConditionalElement();
      case ZTypedocTypeKind.Predicate:
        return createPredicateElement();
      case ZTypedocTypeKind.Reference:
        return createReferenceElement();
      case ZTypedocTypeKind.Union:
        return createJoinedElement(' | ');
      case ZTypedocTypeKind.Intersection:
        return createJoinedElement(' & ');
      case ZTypedocTypeKind.Tuple:
        return createTupleElement();
      case ZTypedocTypeKind.IndexedAccess:
        return createIndexAccess();
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
    return props.prefix ? (
      <Typography variant={variant} component={component} className='ZTypedocTypeViewer-header'>
        {props.prefix}
      </Typography>
    ) : null;
  }

  /**
   * Creates the type separator.
   *
   * @returns The jsx for the type separator.
   */
  function createSeparator() {
    return props.suffix ? (
      <Typography variant={variant} component={component} className='ZTypedocTypeViewer-separator'>
        {props.suffix}
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
  suffix: null,
  prefix: null,
  onReference: noop
};
