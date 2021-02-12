import { Typography } from '@material-ui/core';
import { ZTypedocKind } from '@zthun/works.core';
import { kebabCase, noop } from 'lodash';
import React, { ElementType, Fragment, ReactNode } from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { IZTypedocDeclarationViewerProps } from './typedoc-declaration-viewer.props';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';
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
   * Creates a declaration for a root element.
   *
   * @param keyword The optional keyword.
   *
   * @returns The jsx for the declaration as a single line root element.
   */
  function createRootLevelDeclaration(keyword?: string) {
    const generics = props.declaration.typeParameter || [];
    const clasz = `ZTypedocDeclarationViewer-entity ZTypedocDeclarationViewer-${kebabCase(props.declaration.kindString)}`;
    let generic: ReactNode = null;

    if (generics.length) {
      generic = (
        <Fragment>
          {createTypography('span', '<')}
          {generics.map((ty, i) => (
            <Fragment key={ty.id}>
              {createTypography('span', ty.name)}
              <ZTypedocTypeViewer type={ty.type} prefix=' extends ' />
              {createTypography('span', i === generics.length - 1 ? null : ', ')}
            </Fragment>
          ))}
          {createTypography('span', '>')}
        </Fragment>
      );
    }

    return (
      <div className='ZTypedocDeclarationViewer-root' data-testid='ZTypedocDeclarationViewer-root'>
        <div className={clasz}>
          <ZTypedocFlagsViewer flags={props.declaration.flags} />
          {createTypography('strong', keyword)}
          {createTypography('span', props.declaration.name)}
          {generic}
        </div>
        <ZTypedocCommentViewer comment={props.declaration.comment} />
      </div>
    );
  }

  /**
   * Creates the declaration of a function.
   *
   * @returns The jsx for a function declaration.
   */
  function createFunctionDeclaration() {
    return <ZTypedocSignatureListViewer signatures={props.declaration.signatures} treatCallSignatureAsFunction={true} onEntity={props.onEntity} />;
  }

  switch (props.declaration.kind) {
    case ZTypedocKind.Class:
      return createRootLevelDeclaration('class ');
    case ZTypedocKind.Enum:
      return createRootLevelDeclaration('enum ');
    case ZTypedocKind.Interface:
      return createRootLevelDeclaration('interface ');
    case ZTypedocKind.Namespace:
      return createRootLevelDeclaration('namespace ');
    case ZTypedocKind.Function:
      return createFunctionDeclaration();
    default:
      return createRootLevelDeclaration();
  }
}

ZTypedocDeclarationViewer.defaultProps = {
  onEntity: noop
};
