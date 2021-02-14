import { Typography } from '@material-ui/core';
import { IZTypedocEntity, IZTypedocType, ZTypedocKind } from '@zthun/works.core';
import { first, get, noop, pick } from 'lodash';
import React, { Fragment, ReactNode, useState } from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { IZTypedocSignatureListViewerProps } from './typedoc-signature-list-viewer.props';
import { ZTypedocTypeParametersViewer } from './typedoc-type-parameters-viewer';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Renders a signature list which allows for multiple signatures to be active at a time.
 *
 * @param props The properties; for this component.
 *
 * @returns The jsx to render the signature list.
 */
export function ZTypedocSignatureListViewer(props: IZTypedocSignatureListViewerProps) {
  const [active, setActive] = useState<IZTypedocEntity>(first(props.signatures));

  /**
   * Handles a signature activation.
   *
   * @param e The event that contains the target signature that was clicked.
   */
  function handleActivateSignature(e: any) {
    const target = e.target as HTMLElement;
    const index = +target.getAttribute('data-signature-index');
    setActive(props.signatures[index]);
  }

  /**
   * Creates the documentation for the return value.
   *
   * @returns The jsx for the return value of the active signature.
   */
  function createReturnsDocumentation() {
    if (!active.type) {
      return null;
    }

    return (
      <div className='ZTypedocSignatureListViewer-signature-returns'>
        {createTypedocTypography('Returns', 'h4', 'h4')}
        <ZTypedocTypeViewer type={active.type} onReference={props.onEntity} />
        <ZTypedocCommentViewer comment={pick(active.comment, 'returns')} />
      </div>
    );
  }

  /**
   * Creates a type documentation for inheritance.
   *
   * @param type The type to document.
   * @param title The title of where this came from.
   *
   * @returns The jsx for the inheritance documentation.
   */
  function createTypeInheritanceDocumentation(type: IZTypedocType, title: string) {
    if (!type) {
      return null;
    }

    return (
      <div className='ZTypedocSignatureListViewer-signature-inherits'>
        {createTypedocTypography(title, 'h4', 'h4')}
        <ZTypedocTypeViewer type={type} onReference={props.onEntity} ignoreReferenceIds={true} />
      </div>
    );
  }

  /**
   * Creates the documentation for the parameters.
   *
   * @returns The jsx for the parameter documentation.
   */
  function createParametersDocumentation() {
    const params = active.parameters || [];

    if (!params.length) {
      return null;
    }

    return (
      <div className='ZTypedocSignatureListViewer-signature-parameter-list'>
        <Typography variant='h4'>Parameters</Typography>
        {params.map((param) => (
          <div className='ZTypedocSignatureListViewer-signature-parameter' key={param.id}>
            <ZTypedocFlagsViewer flags={param.flags} />
            {createTypedocTypography(param.name, 'strong')}
            <ZTypedocTypeViewer type={param.type} prefix=': ' onReference={props.onEntity} />
            <ZTypedocCommentViewer comment={param.comment} />
          </div>
        ))}
      </div>
    );
  }

  /**
   * Creates the signature for a property.
   *
   * @param signature The signature to construct.
   *
   * @returns The jsx for a property signature.
   */
  function createPropertySignature(signature: IZTypedocEntity) {
    const def = signature.defaultValue ? createTypedocTypography(` = ${signature.defaultValue}`) : null;

    return (
      <Fragment>
        {createTypedocTypography(signature.name)}
        <ZTypedocTypeViewer type={signature.type} prefix=': ' onReference={props.onEntity} />
        {def}
      </Fragment>
    );
  }

  /**
   * Creates the signature for a function.
   *
   * @param signature The signature to construct.
   * @param accessor The accessor for the signature.
   *
   * @returns The jsx for the signature as a functional signature.
   */
  function createFunctionalSignature(signature: IZTypedocEntity, accessor?: string) {
    const params = signature.parameters || [];

    return (
      <Fragment>
        {createTypedocTypography(accessor, 'strong')}
        {createTypedocTypography(signature.name)}
        <ZTypedocTypeParametersViewer types={signature.typeParameter} />
        {createTypedocTypography('(')}
        {params.map((parameter, i) => (
          <Fragment key={parameter.id}>
            {createTypedocTypography(get(parameter, 'flags.isRest') ? '...' : null)}
            {createTypedocTypography(parameter.name, 'strong')}
            {createTypedocTypography(get(parameter, 'flags.isOptional') ? '?' : null)}
            <ZTypedocTypeViewer type={parameter.type} prefix=': ' suffix={parameter.defaultValue ? ` = ${parameter.defaultValue}` : null} onReference={props.onEntity} />
            {createTypedocTypography(i === params.length - 1 ? null : ', ')}
          </Fragment>
        ))}
        {createTypedocTypography(')')}
        <ZTypedocTypeViewer type={signature.type} prefix=': ' onReference={props.onEntity} />
      </Fragment>
    );
  }

  /**
   * Creates the jsx for a signature button.
   *
   * @param signature The signature to create the jsx for.
   * @param index The signature index.
   *
   * @returns The jsx for the signature.
   */
  function createSignature(signature: IZTypedocEntity, index: number) {
    if (!signature) {
      return null;
    }

    let clasz = 'ZTypedocSignatureListViewer-signature';
    let activate = noop;
    let body: ReactNode;

    if (props.signatures.length > 1 && active === signature) {
      clasz = `${clasz} ZTypedocSignatureListViewer-signature-active`;
    } else if (props.signatures.length > 1) {
      clasz = `${clasz} ZTypedocSignatureListViewer-signature-inactive`;
      activate = handleActivateSignature;
    }

    switch (signature.kind) {
      case ZTypedocKind.GetSignature:
        body = createFunctionalSignature(signature, 'get ');
        break;
      case ZTypedocKind.SetSignature:
        body = createFunctionalSignature(signature, 'set ');
        break;
      case ZTypedocKind.CallSignature:
        body = createFunctionalSignature(signature, props.treatCallSignatureAsFunction ? 'function ' : null);
        break;
      case ZTypedocKind.Property:
      case ZTypedocKind.EnumMember:
      case ZTypedocKind.Variable:
        body = createPropertySignature(signature);
        break;
      default:
        body = createFunctionalSignature(signature);
        break;
    }

    return (
      <div className={clasz} key={index} data-signature-index={index} onClick={activate}>
        {body}
      </div>
    );
  }

  if (!get(props, 'signatures.length')) {
    return null;
  }

  return (
    <div className='ZTypedocSignatureListViewer-root' data-testid='ZTypedocSignatureListViewer-root'>
      <div className='ZTypedocSignatureListViewer-signature-list'>{props.signatures.map((sig, i) => createSignature(sig, i))}</div>
      <ZTypedocCommentViewer comment={pick(active.comment, 'text', 'shortText')} />
      {createParametersDocumentation()}
      {createReturnsDocumentation()}
      {createTypeInheritanceDocumentation(active.inheritedFrom, 'Inherited From')}
      {createTypeInheritanceDocumentation(active.implementationOf, 'Implementation Of')}
    </div>
  );
}

ZTypedocSignatureListViewer.defaultProps = {
  onEntity: noop,
  treatCallSignatureAsFunction: true
};
