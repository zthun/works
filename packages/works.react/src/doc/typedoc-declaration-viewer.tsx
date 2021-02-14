import { ZTypedocKind } from '@zthun/works.core';
import { kebabCase, noop } from 'lodash';
import React, { Fragment, ReactNode } from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { IZTypedocDeclarationViewerProps } from './typedoc-declaration-viewer.props';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';
import { ZTypedocTypeListViewer } from './typedoc-type-list-viewer';
import { ZTypedocTypeParametersViewer } from './typedoc-type-parameters-viewer';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Renders a declaration type.
 *
 * This is similar to the entity viewer, but this renders the type as a declaration.  For example,
 * a class entity would render as 'class name' with the flags.
 *
 * @param props The properties for the declaration.
 *
 * @returns The jsx to render the declaration.
 */
export function ZTypedocDeclarationViewer(props: IZTypedocDeclarationViewerProps) {
  /**
   * Creates the declaration node.
   *
   * @param child The child node for the declaration.
   *
   * @returns The jsx for the declaration.
   */
  function createDeclaration(child: ReactNode) {
    const clasz = `ZTypedocDeclarationViewer-entity ZTypedocDeclarationViewer-${kebabCase(props.declaration.kindString)}`;
    return (
      <div className='ZTypedocDeclarationViewer-root' data-testid='ZTypedocDeclarationViewer-root'>
        <div className={clasz}>
          <ZTypedocFlagsViewer flags={props.declaration.flags} />
          {child}
        </div>
        <ZTypedocCommentViewer comment={props.declaration.comment} />
      </div>
    );
  }

  /**
   * Creates a declaration for a group style element.
   *
   * @param keyword The optional keyword.
   *
   * @returns The jsx for the declaration as a single line root element.
   */
  function createGroupDeclaration(keyword?: string) {
    return createDeclaration(
      <Fragment>
        {createTypedocTypography(keyword, 'strong')}
        {createTypedocTypography(props.declaration.name)}
        <ZTypedocTypeParametersViewer types={props.declaration.typeParameter} onEntity={props.onEntity} />
        <ZTypedocTypeListViewer types={props.declaration.extendedTypes} prefix=' extends ' prefixContainer='strong' onEntity={props.onEntity} />
        <ZTypedocTypeListViewer types={props.declaration.implementedTypes} prefix=' implements ' prefixContainer='strong' onEntity={props.onEntity} />
      </Fragment>
    );
  }

  const createClassDeclaration = createGroupDeclaration.bind(null, 'class ');
  const createEnumDeclaration = createGroupDeclaration.bind(null, 'enum ');
  const createInterfaceDeclaration = createGroupDeclaration.bind(null, 'interface ');
  const createNamespaceDeclaration = createGroupDeclaration.bind(null, 'namespace ');

  /**
   * Creates the jsx declaration for a variable.
   *
   * @returns The jsx for a variable declaration.
   */
  function createVariableDeclaration() {
    return createDeclaration(
      <Fragment>
        {createTypedocTypography('var ', 'strong')}
        {createTypedocTypography(props.declaration.name)}
        <ZTypedocTypeViewer type={props.declaration.type} prefix=': ' onReference={props.onEntity} />
        {createTypedocTypography(' = ', 'strong')}
        {createTypedocTypography(props.declaration.defaultValue)}
      </Fragment>
    );
  }

  /**
   * Creates the declaration jsx for a function.
   *
   * @returns The jsx for a function declaration.
   */
  function createFunctionDeclaration() {
    return createDeclaration(<ZTypedocSignatureListViewer signatures={props.declaration.signatures} treatCallSignatureAsFunction={true} onEntity={props.onEntity} />);
  }

  /**
   * Creates the declaration for a type alias.
   *
   * @returns The jsx for a type alias.
   */
  function createTypeAliasDeclaration() {
    return (
      <div className='ZTypedocDeclarationViewer-root' data-testid='ZTypedocDeclarationViewer-root'>
        <div className='ZTypedocDeclarationViewer-entity ZTypedocDeclarationViewer-type-alias'>
          <ZTypedocFlagsViewer flags={props.declaration.flags} />
          {createTypedocTypography('type ', 'strong')}
          {createTypedocTypography(props.declaration.name)}
          {createTypedocTypography(' = ', 'strong')}
          <ZTypedocTypeViewer type={props.declaration.type} onReference={props.onEntity} />
        </div>
        <ZTypedocCommentViewer comment={props.declaration.comment} />
      </div>
    );
  }

  switch (props.declaration.kind) {
    case ZTypedocKind.Class:
      return createClassDeclaration();
    case ZTypedocKind.Enum:
      return createEnumDeclaration();
    case ZTypedocKind.Interface:
      return createInterfaceDeclaration();
    case ZTypedocKind.Namespace:
      return createNamespaceDeclaration();
    case ZTypedocKind.Variable:
      return createVariableDeclaration();
    case ZTypedocKind.TypeAlias:
      return createTypeAliasDeclaration();
    case ZTypedocKind.Function:
      return createFunctionDeclaration();
    default:
      return createDeclaration(props.declaration.name);
  }
}

ZTypedocDeclarationViewer.defaultProps = {
  onEntity: noop
};
