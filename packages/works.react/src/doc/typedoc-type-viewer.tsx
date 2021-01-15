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
   * Creates a keyword string.
   *
   * @param keyword The key to create for.
   *
   * @returns The jsx for the keyword or null if keyword is falsy.
   */
  function createKeyword(keyword: ReactNode) {
    return keyword ? (
      <Typography className='ZTypedocTypeViewer-keyword' variant='body2' component='span'>
        {keyword}
      </Typography>
    ) : null;
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
      <Fragment>
        {createKeyword('<')}
        {args.map((ty, i) => (
          <ZTypedocTypeViewer key={i} type={ty} onReference={props.onReference} suffix={chooseIfNotLast(i, args.length, ', ')} />
        ))}
        {createKeyword('>')}
      </Fragment>
    );
  }

  /**
   * Creates the intrinsic element.
   *
   * @returns The jsx for an intrinsic element.
   */
  function createIntrinsicElement() {
    return (
      <Fragment>
        <Typography className='ZTypedocTypeViewer-title' variant='body2' component='span'>
          {props.type.name}
        </Typography>
        {createGenericArguments()}
      </Fragment>
    );
  }

  /**
   * Creates a literal element.
   *
   * @returns The jsx for a literal element.
   */
  function createLiteralElement() {
    const value = props.type.value;
    const literalType = typeof value;
    const wrap = literalType === 'string' ? createKeyword('"') : null;

    return (
      <Fragment>
        {wrap}
        {props.type.value}
        {wrap}
      </Fragment>
    );
  }

  /**
   * Creates a type element that has a suffix keyword at the end.
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
        <Typography className='ZTypedocTypeViewer-title' data-entity={props.type.id} variant='body2' component='a' onClick={handleReference}>
          {props.type.name}
        </Typography>
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
    const elements = props.type.elements;

    return (
      <Fragment>
        {createKeyword('[')}
        {elements.map((ty, i) => (
          <ZTypedocTypeViewer key={i} type={ty} onReference={props.onReference} suffix={chooseIfNotLast(i, elements.length, ', ')} />
        ))}
        {createKeyword(']')}
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
    return (
      <Fragment>
        <ZTypedocTypeViewer type={props.type.checkType} onReference={props.onReference} />
        {createKeyword(' extends ')}
        <ZTypedocTypeViewer type={props.type.extendsType} onReference={props.onReference} />
        {createKeyword(' ? ')}
        <ZTypedocTypeViewer type={props.type.trueType} onReference={props.onReference} />
        {createKeyword(' : ')}
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
    return (
      <Fragment>
        {createIntrinsicElement()}
        {createKeyword(' is ')}
        <ZTypedocTypeViewer type={props.type.targetType} onReference={props.onReference} />
      </Fragment>
    );
  }

  /**
   * Creates an index access type element.
   *
   * @returns The jsx for an index access element.
   */
  function createIndexAccessElement() {
    return (
      <Fragment>
        {createKeyword('(')}
        <ZTypedocTypeViewer type={props.type.objectType} onReference={props.onReference} />
        {createKeyword(')[')}
        <ZTypedocTypeViewer type={props.type.indexType} onReference={props.onReference} />
        {createKeyword(']')}
      </Fragment>
    );
  }

  /**
   * Creates a rest type element.
   *
   * @returns The jsx for a rest element.
   */
  function createRestElement() {
    return (
      <Fragment>
        {createKeyword('...')}
        <ZTypedocTypeViewer type={props.type.elementType} onReference={props.onReference} />
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
      case ZTypedocTypeKind.Conditional:
        return createConditionalElement();
      case ZTypedocTypeKind.IndexedAccess:
        return createIndexAccessElement();
      // case ZTypedocTypeKind.Inferred:
      //   return createInferredElement();
      case ZTypedocTypeKind.Intersection:
        return createJoinedElement(' & ');
      case ZTypedocTypeKind.Literal:
        return createLiteralElement();
      // case ZTypedocTypeKind.Mapped:
      //  return createMappedElement();
      case ZTypedocTypeKind.Optional:
        return createEndTypeElement('?');
      case ZTypedocTypeKind.Predicate:
        return createPredicateElement();
      // case ZTypedocTypeKind.Query:
      //   return createQueryElement();
      case ZTypedocTypeKind.Reference:
        return createReferenceElement();
      // case ZTypedocTypeKind.Reflection:
      //   return createReflectionElement();
      case ZTypedocTypeKind.Rest:
        return createRestElement();
      // case ZTypedocTypeKind.TemplateLiteral:
      //  return createTemplateLiteralElement();
      case ZTypedocTypeKind.Tuple:
        return createTupleElement();
      // case ZTypedocTypeKind.TypeOperator:
      //  return createTypeOperatorElement();
      // case ZTypedocTypeKind.TypeParameter:
      //  return createTypeParameterElement();
      case ZTypedocTypeKind.Union:
        return createJoinedElement(' | ');
      // case ZTypedocTypeKind.Intrinsic:
      // case ZTypedocTypeKind.Unknown:
      default:
        return createIntrinsicElement();
    }
  }

  if (!props.type) {
    return null;
  }

  return (
    <div className='ZTypedocTypeViewer-root' data-testid='ZTypedocTypeViewer-root'>
      {createKeyword(props.prefix)}
      {createTypeElement()}
      {createKeyword(props.suffix)}
    </div>
  );
}

ZTypedocTypeViewer.defaultProps = {
  suffix: null,
  prefix: null,
  onReference: noop
};
