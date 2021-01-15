import { Typography } from '@material-ui/core';
import { IZTypedocType, ZTypedocTypeKind } from '@zthun/works.core';
import { noop } from 'lodash';
import React, { ElementType, Fragment, ReactNode } from 'react';
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
   * Creates the title element.
   *
   * @param title The title to create the typography for.
   * @param component The component to use.
   * @param id The optional data id of the node.
   * @param click The event handler for a click event.
   *
   * @returns The jsx for the title element.
   */
  function createTitle(title: string, component: ElementType<any>, id = null, click: (e: any) => void = noop) {
    return (
      <Typography className='ZTypedocTypeViewer-title' variant='body2' component={component} data-entity-id={id} onClick={click}>
        {title}
      </Typography>
    );
  }

  /**
   * Creates an inner type.
   *
   * @param ty The inner type.
   * @param prefix The optional inner type prefix.
   * @param suffix The optional inner type suffix.
   * @param key The optional key.
   *
   * @returns The jsx for the inner type.
   */
  function createType(ty: IZTypedocType, prefix: ReactNode = null, suffix: ReactNode = null, key?: any) {
    return <ZTypedocTypeViewer key={key} type={ty} onReference={props.onReference} prefix={prefix} suffix={suffix} />;
  }

  /**
   * Creates the jsx for a list of types separated by a suffix.
   *
   * @param list The list to create jsx for.
   * @param suffix The list item separator suffix.
   *
   * @returns The jsx for the list.
   */
  function createTypeList(list: IZTypedocType[], suffix: ReactNode) {
    return list.map((ty, i) => createType(ty, null, i < list.length - 1 ? suffix : null, i));
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

    return (
      <Fragment>
        {createKeyword('<')}
        {createTypeList(props.type.typeArguments, ', ')}
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
        {createTitle(props.type.name, 'span')}
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
        {createTitle(props.type.name, 'a', props.type.id, handleReference)}
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
    return (
      <Fragment>
        {createKeyword('[')}
        {createTypeList(props.type.elements, ', ')}
        {createKeyword(']')}
      </Fragment>
    );
  }

  /**
   * Creates the element for a conditional type.
   *
   * @returns The jsx for a conditional type.
   */
  function createConditionalElement() {
    return (
      <Fragment>
        {createType(props.type.checkType)}
        {createKeyword(' extends ')}
        {createType(props.type.extendsType)}
        {createKeyword(' ? ')}
        {createType(props.type.trueType)}
        {createKeyword(' : ')}
        {createType(props.type.falseType)}
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
        {createType(props.type.targetType)}
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
        {createType(props.type.objectType)}
        {createKeyword(')[')}
        {createType(props.type.indexType)}
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
        {createType(props.type.elementType)}
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
        return createType(props.type.elementType, null, '[]');
      case ZTypedocTypeKind.Conditional:
        return createConditionalElement();
      case ZTypedocTypeKind.IndexedAccess:
        return createIndexAccessElement();
      // case ZTypedocTypeKind.Inferred:
      //   return createInferredElement();
      case ZTypedocTypeKind.Intersection:
        return createTypeList(props.type.types, ' & ');
      case ZTypedocTypeKind.Literal:
        return createLiteralElement();
      // case ZTypedocTypeKind.Mapped:
      //  return createMappedElement();
      case ZTypedocTypeKind.Optional:
        return createType(props.type.elementType, null, '?');
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
        return createTypeList(props.type.types, ' | ');
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
