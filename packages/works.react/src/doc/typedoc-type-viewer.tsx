import { IZTypedocType, ZTypedocTypeKind } from '@zthun/works.core';
import React, { ElementType, Fragment, ReactNode } from 'react';
import { shade } from '../theme/shade';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { makeStyles } from '../theme/make-styles';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocTypeListViewer } from './typedoc-type-list-viewer';

/**
 * Represents properties for the type viewer.
 */
export interface IZTypedocTypeViewerProps extends IZComponentEntityRedirect<number> {
  /**
   * The type to view.
   */
  type: IZTypedocType;

  /**
   * Suffix element.
   *
   * @default null
   */
  suffix?: ReactNode;

  /**
   * Prefix element.
   *
   * @default null
   */
  prefix?: ReactNode;

  /**
   * An option that forces the type to be situated at a div root instead of a fragment.
   *
   * @default true
   */
  container?: boolean;

  /**
   * An option to ignore reference ids even if they are present.
   *
   * @default false
   */
  ignoreReferenceIds?: boolean;
}

export const useTypedocTypeViewerStyles = makeStyles()((theme) => {
  return {
    root: {
      'fontFamily': theme.fonts.fixed,
      'display': 'inline-block',

      'a': {
        'cursor': 'pointer',
        'color': theme.palette.secondary.main,

        '&:hover': {
          color: shade(theme.palette.secondary.main, -64)
        }
      },

      'strong': {
        fontWeight: 'bold'
      },

      '.MuiTypography-root': {
        fontFamily: theme.fonts.fixed
      }
    },

    title: {
      fontStyle: 'italic'
    },

    keyword: {
      whiteSpace: 'pre-wrap'
    }
  };
});

/**
 * Constructs the jsx for the typedoc type viewer.
 *
 * @param props The properties for this viewer.
 *
 * @returns The jsx for the type viewer.
 */
export function ZTypedocTypeViewer(props: IZTypedocTypeViewerProps) {
  const { type, suffix = null, prefix = null, container = true, ignoreReferenceIds = false, onEntity } = props;
  const styles = useTypedocTypeViewerStyles();

  /**
   * Occurs when the user clicks on another entity.
   *
   * @param e The mouse event.
   */
  function handleReference(e: any) {
    const element = e.target as HTMLElement;
    const id = +element.getAttribute('data-entity');
    onEntity(id);
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

  const createKeyword: (children: ReactNode) => ReactNode = createTypography.bind(null, `ZTypedocTypeViewer-keyword ${styles.classes.keyword}`, 'span');
  const createText: (children: ReactNode) => ReactNode = createTypography.bind(null, 'ZTypedocTypeViewer-text', 'span');
  const createTitle: (component: ElementType<any>, children: ReactNode, id?: any, click?: (e: any) => void) => ReactNode = createTypography.bind(null, `ZTypedocTypeViewer-title ${styles.classes.title}`);

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
    return <ZTypedocTypeViewer type={ty} container={false} onEntity={onEntity} prefix={prefix} suffix={suffix} />;
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
  function createTypeList(types: IZTypedocType[], prefix?: ReactNode, suffix?: ReactNode, separator?: string) {
    return <ZTypedocTypeListViewer types={types} prefix={prefix} suffix={suffix} separator={separator} container={false} onEntity={onEntity} />;
  }

  /**
   * Creates the intrinsic element.
   *
   * @returns The jsx for an intrinsic element.
   */
  function createIntrinsicElement() {
    return (
      <Fragment>
        {createTitle('span', type.name)}
        {createTypeList(type.typeArguments, '<', '>')}
      </Fragment>
    );
  }

  /**
   * Creates a literal element.
   *
   * @returns The jsx for a literal element.
   */
  function createLiteralElement() {
    const value = type.value;
    const literalType = typeof value;
    const wrap = literalType === 'string' ? createKeyword('"') : null;

    return (
      <Fragment>
        {wrap}
        {createText(type.value)}
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
    if (ignoreReferenceIds || type.id == null) {
      return createIntrinsicElement();
    }

    return (
      <Fragment>
        {createTitle('a', type.name, type.id, handleReference)}
        {createTypeList(type.typeArguments, '<', '>')}
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
        {createType(type.checkType)}
        {createKeyword(' extends ')}
        {createType(type.extendsType)}
        {createKeyword(' ? ')}
        {createType(type.trueType)}
        {createKeyword(' : ')}
        {createType(type.falseType)}
      </Fragment>
    );
  }

  /**
   * Creates a predicate type element.
   *
   * @returns The jsx for a predicate element.
   */
  function createPredicateElement() {
    const asserts: ReactNode = type.asserts ? createKeyword('asserts ') : null;
    const target: ReactNode = type.targetType ? (
      <Fragment>
        {createKeyword(' is ')}
        {createType(type.targetType)}
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
        {createType(type.objectType)}
        {createKeyword('[')}
        {createType(type.indexType)}
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
    }[type.readonlyModifier || ''];

    const opt = {
      '+': '?',
      '-': '-?',
      '': null
    }[type.optionalModifier || ''];

    const as = type.nameType ? (
      <Fragment>
        {createKeyword(' as ')}
        {createType(type.nameType)}
      </Fragment>
    ) : null;

    return (
      <Fragment>
        {createKeyword('{')}
        {createKeyword(read)}
        {createKeyword('[')}
        {createText(type.parameter)}
        {createKeyword(' in ')}
        {createType(type.parameterType)}
        {as}
        {createKeyword(']')}
        {createKeyword(opt)}
        {createKeyword(': ')}
        {createType(type.templateType)}
        {createKeyword('}')}
      </Fragment>
    );

    // return `{ ${read}[${this.parameter} in ${this.parameterType}${name}]${opt}: ${this.templateType}}`;
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
        {createText(type.name)}
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
    const isFunction = !type.declaration.children && type.declaration.signatures;
    const display = isFunction ? 'function' : 'object';

    return <Fragment>{createType({ type: ZTypedocTypeKind.Intrinsic, name: display })}</Fragment>;
  }

  /**
   * Creates the under element based on the type's type.
   *
   * @returns The jsx for the type.
   */
  function createTypeElement() {
    switch (type.type) {
      case ZTypedocTypeKind.Array:
        return createType(type.elementType, null, '[]');
      case ZTypedocTypeKind.Conditional:
        return createConditionalElement();
      case ZTypedocTypeKind.IndexedAccess:
        return createIndexAccessElement();
      case ZTypedocTypeKind.Inferred:
        return createInferredElement();
      case ZTypedocTypeKind.Intersection:
        return createTypeList(type.types, null, null, ' & ');
      case ZTypedocTypeKind.Intrinsic:
      case ZTypedocTypeKind.TypeParameter:
        return createIntrinsicElement();
      case ZTypedocTypeKind.Literal:
        return createLiteralElement();
      case ZTypedocTypeKind.Mapped:
        return createMappedElement();
      case ZTypedocTypeKind.Optional:
        return createType(type.elementType, null, '?');
      case ZTypedocTypeKind.Predicate:
        return createPredicateElement();
      case ZTypedocTypeKind.Query:
        return createType(type.queryType, 'typeof ');
      case ZTypedocTypeKind.Reference:
        return createReferenceElement();
      case ZTypedocTypeKind.Reflection:
        return createReflectionElement();
      case ZTypedocTypeKind.Rest:
        return createType(type.elementType, '...');
      case ZTypedocTypeKind.Tuple:
        return createTypeList(type.elements, '[', ']');
      case ZTypedocTypeKind.TypeOperator:
        return createType(type.target, `${type.operator} `);
      case ZTypedocTypeKind.Union:
        return createTypeList(type.types, null, null, ' | ');
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
        {createKeyword(prefix)}
        {createTypeElement()}
        {createKeyword(suffix)}
      </Fragment>
    );
  }

  if (!type) {
    return null;
  }

  return container ? <div className={`ZTypedocTypeViewer-root ${styles.classes.root}`}>{createFlow()}</div> : <Fragment>{createFlow()}</Fragment>;
}
