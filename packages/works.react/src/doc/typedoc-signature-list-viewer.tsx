import { Typography } from '@material-ui/core';
import { IZTypedocEntity, ZTypedocKind } from '@zthun/works.core';
import { first, get, noop, pick } from 'lodash';
import React, { ElementType, Fragment, ReactNode, useState } from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { IZTypedocSignatureListViewerProps } from './typedoc-signature-list-viewer.props';
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
   * Creates a typography section.
   *
   * @param text The typography text.
   * @param component The component to use.
   *
   * @returns The jsx for the typography.
   */
  function createTypography(text: string, component: ElementType<any> = 'span') {
    if (!text) {
      return null;
    }

    return (
      <Typography variant='body2' component={component}>
        {text}
      </Typography>
    );
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
        <Typography variant='h4'>Returns</Typography>
        <ZTypedocTypeViewer type={active.type} onReference={props.onEntity} />
        <ZTypedocCommentViewer comment={pick(active.comment, 'returns')} />
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
            {createTypography(param.name, 'strong')}
            <ZTypedocTypeViewer type={param.type} prefix=': ' onReference={props.onEntity} />
            <ZTypedocCommentViewer comment={param.comment} />
          </div>
        ))}
      </div>
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

    const params = signature.parameters || [];
    const generics = signature.typeParameter || [];

    let clasz = 'ZTypedocSignatureListViewer-signature';
    let activate = noop;
    let accessor: string;
    let generic: ReactNode = null;

    if (props.signatures.length > 1 && active === signature) {
      clasz = `${clasz} ZTypedocSignatureListViewer-signature-active`;
    } else if (props.signatures.length > 1) {
      clasz = `${clasz} ZTypedocSignatureListViewer-signature-inactive`;
      activate = handleActivateSignature;
    }

    switch (signature.kind) {
      case ZTypedocKind.GetSignature:
        accessor = 'get ';
        break;
      case ZTypedocKind.SetSignature:
        accessor = 'set ';
        break;
      case ZTypedocKind.CallSignature:
        accessor = props.treatCallSignatureAsFunction ? 'function ' : null;
        break;
      default:
        accessor = null;
        break;
    }

    if (generics.length) {
      generic = (
        <Fragment>
          {createTypography('<')}
          {signature.typeParameter.map((ty, i) => (
            <Fragment key={ty.id}>
              {createTypography(ty.name)}
              <ZTypedocTypeViewer type={ty.type} prefix=' extends ' />
              {createTypography(i === generics.length - 1 ? null : ', ')}
            </Fragment>
          ))}
          {createTypography('>')}
        </Fragment>
      );
    }

    return (
      <div className={clasz} key={index} data-signature-index={index} onClick={activate}>
        {createTypography(accessor, 'strong')}
        {createTypography(signature.name)}
        {generic}
        {createTypography('(')}
        {params.map((parameter, i) => (
          <Fragment key={parameter.id}>
            {createTypography(get(parameter, 'flags.isRest') ? '...' : null)}
            {createTypography(parameter.name, 'strong')}
            {createTypography(get(parameter, 'flags.isOptional') ? '?' : null)}
            <ZTypedocTypeViewer type={parameter.type} prefix=': ' suffix={parameter.defaultValue ? ` = ${parameter.defaultValue}` : null} onReference={props.onEntity} />
            {createTypography(i === params.length - 1 ? null : ', ')}
          </Fragment>
        ))}
        {createTypography(')')}
        <ZTypedocTypeViewer type={signature.type} prefix=': ' onReference={props.onEntity} />
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
    </div>
  );
}

ZTypedocSignatureListViewer.defaultProps = {
  onEntity: noop,
  treatCallSignatureAsFunction: true
};
