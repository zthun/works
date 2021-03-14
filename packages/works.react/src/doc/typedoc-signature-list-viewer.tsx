import { Typography } from '@material-ui/core';
import { IZTypedocEntity, IZTypedocType, ZTypedocKind } from '@zthun/works.core';
import { first, get, noop, pick } from 'lodash';
import React, { Fragment, ReactNode, useMemo, useState } from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { ZTypedocIcon } from './typedoc-icon';
import { IZTypedocSignatureListViewerProps } from './typedoc-signature-list-viewer.props';
import { ZTypedocTypeListViewer } from './typedoc-type-list-viewer';
import { ZTypedocTypeParametersViewer } from './typedoc-type-parameters-viewer';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Renders a signature list which allows for multiple signatures to be active at a time.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx to render the signature list.
 */
export function ZTypedocSignatureListViewer(props: IZTypedocSignatureListViewerProps) {
  const expanded: { accessor?: string; signature: IZTypedocEntity }[] = useMemo(expandSignatures, [props.signatures]);
  const [active, setActive] = useState<IZTypedocEntity>(first(expanded)?.signature);

  /**
   * Expands the property signatures.
   *
   * This looks for signature types that have child signatures.
   *
   * @returns The full signature list expanded and flattened.
   */
  function expandSignatures() {
    let signatures = props.signatures || [];
    signatures = signatures.filter((sig) => !!sig);

    let expanded: { accessor?: string; signature: IZTypedocEntity }[] = [];

    for (const sig of signatures) {
      switch (sig.kind) {
        case ZTypedocKind.Accessor:
          expanded = expanded.concat((sig.getSignature || []).map((getter) => ({ accessor: 'get ', signature: getter })));
          expanded = expanded.concat((sig.setSignature || []).map((setter) => ({ accessor: 'set ', signature: setter })));
          break;
        case ZTypedocKind.Function:
          expanded = expanded.concat(sig.signatures.map((func) => ({ accessor: 'function ', signature: func })));
          break;
        case ZTypedocKind.Constructor:
        case ZTypedocKind.Method:
          expanded = expanded.concat(sig.signatures.map((func) => ({ signature: func })));
          break;
        case ZTypedocKind.GetSignature:
          expanded.push({ accessor: 'get ', signature: sig });
          break;
        case ZTypedocKind.SetSignature:
          expanded.push({ accessor: 'set ', signature: sig });
          break;
        default:
          expanded.push({ signature: sig });
          break;
      }
    }

    return expanded;
  }

  /**
   * Handles a signature activation.
   *
   * @param e The event that contains the target signature that was clicked.
   */
  function handleActivateSignature(e: any) {
    const target = e.target as HTMLElement;
    const index = +target.getAttribute('data-signature-index');
    setActive(expanded[index].signature);
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
        <ZTypedocTypeViewer type={active.type} onEntity={props.onEntity} />
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
        <ZTypedocTypeViewer type={type} onEntity={props.onEntity} ignoreReferenceIds={true} />
      </div>
    );
  }

  /**
   * Creates the signature for a group entity.
   *
   * The keyword is dependant on the signature kind.
   *
   * @param signature The signature to render.
   *
   * @returns The jsx for the signature
   */
  function createGroupSignature(signature: IZTypedocEntity) {
    const keywords = {};
    keywords[ZTypedocKind.Class] = 'class ';
    keywords[ZTypedocKind.Namespace] = 'namespace ';
    keywords[ZTypedocKind.Interface] = 'interface ';
    keywords[ZTypedocKind.Enum] = 'enum ';

    const keyword = keywords[signature.kind];

    return (
      <Fragment>
        {createTypedocTypography(keyword, 'strong')}
        {createTypedocTypography(signature.name)}
        <ZTypedocTypeParametersViewer types={signature.typeParameter} onEntity={props.onEntity} />
        <ZTypedocTypeListViewer types={signature.extendedTypes} prefix=' extends ' prefixContainer='strong' onEntity={props.onEntity} />
        <ZTypedocTypeListViewer types={signature.implementedTypes} prefix=' implements ' prefixContainer='strong' onEntity={props.onEntity} />
      </Fragment>
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
            <ZTypedocTypeViewer type={param.type} prefix=': ' onEntity={props.onEntity} />
            <ZTypedocCommentViewer comment={param.comment} />
          </div>
        ))}
      </div>
    );
  }

  /**
   * Creates the signature for a property, variable or type alias.
   *
   * @param signature The signature to construct.
   *
   * @returns The jsx for a property signature.
   */
  function createAssignmentSignature(signature: IZTypedocEntity) {
    const keywords = {};
    keywords[ZTypedocKind.Variable] = 'var ';
    keywords[ZTypedocKind.TypeAlias] = 'type ';

    const keyword = keywords[signature.kind];
    const prefix = signature.kind === ZTypedocKind.TypeAlias ? ' = ' : ': ';
    const def = signature.defaultValue ? createTypedocTypography(` = ${signature.defaultValue}`) : null;

    return (
      <Fragment>
        {createTypedocTypography(keyword, 'strong')}
        {createTypedocTypography(signature.name)}
        <ZTypedocTypeViewer type={signature.type} prefix={prefix} onEntity={props.onEntity} />
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
            <ZTypedocTypeViewer type={parameter.type} prefix=': ' suffix={parameter.defaultValue ? ` = ${parameter.defaultValue}` : null} onEntity={props.onEntity} />
            {createTypedocTypography(i === params.length - 1 ? null : ', ')}
          </Fragment>
        ))}
        {createTypedocTypography(')')}
        <ZTypedocTypeViewer type={signature.type} prefix=': ' onEntity={props.onEntity} />
      </Fragment>
    );
  }

  /**
   * Creates the signature for a kind that we don't currently support. in this list.
   *
   * @param signature The signature to mock render.
   *
   * @returns The jsx for an unsupported signature.
   */
  function createUnsupportedSignature(signature: IZTypedocEntity) {
    return (
      <Fragment>
        {createTypedocTypography(`[${signature.kindString}] `, 'em')}
        {createTypedocTypography(signature.name)}
      </Fragment>
    );
  }

  /**
   * Creates the jsx for a signature button.
   *
   * @param signatureWithKeyword The expanded signature to create the jsx for.
   * @param index The signature index.
   *
   * @returns The jsx for the signature.
   */
  function createSignature(signatureWithKeyword: { accessor?: string; signature: IZTypedocEntity }, index: number) {
    let clasz = 'ZTypedocSignatureListViewer-signature';
    let activate = noop;
    let body: ReactNode;

    if (expanded.length > 1 && active === signatureWithKeyword.signature) {
      clasz = `${clasz} ZTypedocSignatureListViewer-signature-active`;
    } else if (expanded.length > 1) {
      clasz = `${clasz} ZTypedocSignatureListViewer-signature-inactive`;
      activate = handleActivateSignature;
    }

    switch (signatureWithKeyword.signature.kind) {
      case ZTypedocKind.GetSignature:
      case ZTypedocKind.SetSignature:
      case ZTypedocKind.CallSignature:
      case ZTypedocKind.ConstructorSignature:
        body = createFunctionalSignature(signatureWithKeyword.signature, signatureWithKeyword.accessor);
        break;
      case ZTypedocKind.Property:
      case ZTypedocKind.EnumMember:
      case ZTypedocKind.Variable:
      case ZTypedocKind.TypeAlias:
        body = createAssignmentSignature(signatureWithKeyword.signature);
        break;
      case ZTypedocKind.Class:
      case ZTypedocKind.Enum:
      case ZTypedocKind.Namespace:
      case ZTypedocKind.Interface:
        body = createGroupSignature(signatureWithKeyword.signature);
        break;
      default:
        body = createUnsupportedSignature(signatureWithKeyword.signature);
        break;
    }

    return (
      <div className={clasz} key={index} data-signature-index={index} onClick={activate}>
        {body}
      </div>
    );
  }

  /**
   * Creates the header if the owner is specified.
   *
   * @returns The jsx for the heading if owner is specified.
   */
  function createHeader() {
    return props.owner ? (
      <div className='ZTypedocSignatureListViewer-header'>
        <ZTypedocIcon kind={props.owner.kind} />
        <ZTypedocFlagsViewer flags={props.owner.flags} />
        {createTypedocTypography(props.owner.name, 'strong')}
      </div>
    ) : null;
  }

  if (!expanded.length) {
    return null;
  }

  return (
    <div className='ZTypedocSignatureListViewer-root' data-testid='ZTypedocSignatureListViewer-root'>
      {createHeader()}
      <div className='ZTypedocSignatureListViewer-signature-list'>{expanded.map((sig, i) => createSignature(sig, i))}</div>
      <ZTypedocCommentViewer comment={pick(active.comment, 'text', 'shortText')} />
      {createParametersDocumentation()}
      {createReturnsDocumentation()}
      {createTypeInheritanceDocumentation(active.inheritedFrom, 'Inherited From')}
      {createTypeInheritanceDocumentation(active.implementationOf, 'Implementation Of')}
    </div>
  );
}

ZTypedocSignatureListViewer.defaultProps = {
  onEntity: noop
};
