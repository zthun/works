import { Typography } from '@material-ui/core';
import { ZTypedocKind } from '@zthun/works.core';
import { kebabCase, noop } from 'lodash';
import React, { ElementType, Fragment, ReactNode } from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { IZTypedocDeclarationViewerProps } from './typedoc-declaration-viewer.props';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';
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
   * Creates the typography for text based elements.
   *
   * @param component The component type for the typography.
   * @param child The text data to put in the typography.
   *
   * @returns The typography jsx.
   */
  function createTypography(component: ElementType<any>, child: ReactNode) {
    return child ? (
      <Typography variant='body2' component={component}>
        {child}
      </Typography>
    ) : null;
  }

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
        {createTypography('strong', keyword)}
        {createTypography('span', props.declaration.name)}
        <ZTypedocTypeParametersViewer types={props.declaration.typeParameter} onEntity={props.onEntity} />
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
        {createTypography('strong', 'var ')}
        {createTypography('span', props.declaration.name)}
        <ZTypedocTypeViewer type={props.declaration.type} prefix=': ' onReference={props.onEntity} />
        {createTypography('strong', ' = ')}
        {createTypography('span', props.declaration.defaultValue)}
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
          {createTypography('strong', 'type ')}
          {createTypography('span', props.declaration.name)}
          {createTypography('strong', ' = ')}
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
