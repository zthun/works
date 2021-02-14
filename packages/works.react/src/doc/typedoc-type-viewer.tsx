import { IZTypedocType, ZTypedocTypeKind } from '@zthun/works.core';
import { noop } from 'lodash';
import React, { ElementType, Fragment, ReactNode } from 'react';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocTypeListViewer } from './typedoc-type-list-viewer';
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
   * Creates the typography for text based elements.
   *
   * @param clasz The class to attach to the typography.
   * @param component The component type for the typography.
   * @param children The nodes to put in the typography.
   * @param id The optional id for the typography data entity attribute.
   * @param click The optional click handler for what to do when the typography is clicked.
   *
   * @returns The typography jsx.
   */
  function createTypography(clasz: string, component: ElementType<any>, children: ReactNode, id?: any, click?: (e: any) => void) {
    return createTypedocTypography(children, component, undefined, clasz, id, click);
  }

  const createKeyword: (children: ReactNode) => ReactNode = createTypography.bind(null, 'ZTypedocTypeViewer-keyword', 'span');
  const createText: (children: ReactNode) => ReactNode = createTypography.bind(null, 'ZTypedocTypeViewer-text', 'span');
  const createTitle: (component: ElementType<any>, children: ReactNode, id?: any, click?: (e: any) => void) => ReactNode = createTypography.bind(null, 'ZTypedocTypeViewer-title');

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
  function createType(ty: IZTypedocType, prefix: ReactNode = null, suffix: ReactNode = null) {
    return <ZTypedocTypeViewer type={ty} container={false} onReference={props.onReference} prefix={prefix} suffix={suffix} />;
  }

  /**
   * Creates an inner type list.
   *
   * @param types The types to render.
   * @param prefix The prefix node.
   * @param suffix The optional suffix.
   * @param separator The separator between types.
   *
   * @returns The jsx for the inner type list.
   *
   */
  function createTypeList(types: IZTypedocType[], prefix: ReactNode = null, suffix: ReactNode = null, separator?: string) {
    return <ZTypedocTypeListViewer types={types} prefix={prefix} suffix={suffix} separator={separator} container={false} onEntity={props.onReference} />;
  }

  /**
   * Creates the intrinsic element.
   *
   * @returns The jsx for an intrinsic element.
   */
  function createIntrinsicElement() {
    return (
      <Fragment>
        {createTitle('span', props.type.name)}
        {createTypeList(props.type.typeArguments, '<', '>')}
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
        {createText(props.type.value)}
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
        {createTitle('a', props.type.name, props.type.id, handleReference)}
        {createTypeList(props.type.typeArguments, '<', '>')}
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
    const asserts: ReactNode = props.type.asserts ? createKeyword('asserts ') : null;
    const target: ReactNode = props.type.targetType ? (
      <Fragment>
        {createKeyword(' is ')}
        {createType(props.type.targetType)}
      </Fragment>
    ) : null;

    return (
      <Fragment>
        {asserts}
        {createIntrinsicElement()}
        {target}
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
        {createType(props.type.objectType)}
        {createKeyword('[')}
        {createType(props.type.indexType)}
        {createKeyword(']')}
      </Fragment>
    );
  }

  /**
   * Constructs a mapped element.
   *
   * @returns The jsx for a mapped element.
   */
  function createMappedElement() {
    const read = {
      '+': 'readonly ',
      '-': '-readonly ',
      '': null
    }[props.type.readonlyModifier || ''];

    const opt = {
      '+': '?',
      '-': '-?',
      '': null
    }[props.type.optionalModifier || ''];

    const as = props.type.nameType ? (
      <Fragment>
        {createKeyword(' as ')}
        {createType(props.type.nameType)}
      </Fragment>
    ) : null;

    return (
      <Fragment>
        {createKeyword('{')}
        {createKeyword(read)}
        {createKeyword('[')}
        {createText(props.type.parameter)}
        {createKeyword(' in ')}
        {createType(props.type.parameterType)}
        {as}
        {createKeyword(']')}
        {createKeyword(opt)}
        {createKeyword(': ')}
        {createType(props.type.templateType)}
        {createKeyword('}')}
      </Fragment>
    );

    // return `{ ${read}[${this.parameter} in ${this.parameterType}${name}]${opt}: ${this.templateType}}`;
  }

  /**
   * Constructs a query element.
   *
   * @returns The jsx for a query element.
   */
  function createQueryElement() {
    return (
      <Fragment>
        {createKeyword('typeof ')}
        {createType(props.type.queryType)}
      </Fragment>
    );
  }

  /**
   * Constructs an inferred element.
   *
   * @returns The jsx for an inferred element.
   */
  function createInferredElement() {
    return (
      <Fragment>
        {createKeyword('infer ')}
        {createText(props.type.name)}
      </Fragment>
    );
  }

  /**
   * Constructs a type operator element.
   *
   * @returns The jsx for a type operator.
   */
  function createTypeOperatorElement() {
    return (
      <Fragment>
        {createKeyword(`${props.type.operator} `)}
        {createType(props.type.target)}
      </Fragment>
    );
  }

  /**
   * Constructs a reflection element.
   *
   * @returns The jsx for a reflection element.
   */
  function createReflectionElement() {
    // This will be done later.  For now, we will stub this one out.
    const isFunction = !props.type.declaration.children && props.type.declaration.signatures;
    const display = isFunction ? 'function' : 'object';

    return <Fragment>{createType({ type: ZTypedocTypeKind.Intrinsic, name: display })}</Fragment>;
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
      case ZTypedocTypeKind.Inferred:
        return createInferredElement();
      case ZTypedocTypeKind.Intersection:
        return createTypeList(props.type.types, null, null, ' & ');
      case ZTypedocTypeKind.Intrinsic:
      case ZTypedocTypeKind.TypeParameter:
        return createIntrinsicElement();
      case ZTypedocTypeKind.Literal:
        return createLiteralElement();
      case ZTypedocTypeKind.Mapped:
        return createMappedElement();
      case ZTypedocTypeKind.Optional:
        return createType(props.type.elementType, null, '?');
      case ZTypedocTypeKind.Predicate:
        return createPredicateElement();
      case ZTypedocTypeKind.Query:
        return createQueryElement();
      case ZTypedocTypeKind.Reference:
        return createReferenceElement();
      case ZTypedocTypeKind.Reflection:
        return createReflectionElement();
      case ZTypedocTypeKind.Rest:
        return createType(props.type.elementType, '...');
      case ZTypedocTypeKind.Tuple:
        return createTypeList(props.type.elements, '[', ']');
      case ZTypedocTypeKind.TypeOperator:
        return createTypeOperatorElement();
      case ZTypedocTypeKind.Union:
        return createTypeList(props.type.types, null, null, ' | ');
      // case ZTypedocTypeKind.Unknown:
      default:
        return null;
    }
  }

  /**
   * Creates the type kind jsx main flow.
   *
   * @returns The jsx for the main flow.
   */
  function createFlow() {
    return (
      <Fragment>
        {createKeyword(props.prefix)}
        {createTypeElement()}
        {createKeyword(props.suffix)}
      </Fragment>
    );
  }

  if (!props.type) {
    return null;
  }

  return props.container ? <div className='ZTypedocTypeViewer-root'>{createFlow()}</div> : <Fragment>{createFlow()}</Fragment>;
}

ZTypedocTypeViewer.defaultProps = {
  suffix: null,
  prefix: null,
  container: true,
  onReference: noop
};
