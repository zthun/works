import { Typography } from '@mui/material';
import { IZTypedocEntity, IZTypedocType, ZTypedocKind } from '@zthun/works.core';
import { first, get, noop, pick } from 'lodash';
import React, { Fragment, ReactNode, useMemo, useState } from 'react';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { makeStyles } from '../theme/make-styles';
import { shade } from '../theme/shade';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { ZTypedocIcon } from './typedoc-icon';
import { ZTypedocTypeListViewer } from './typedoc-type-list-viewer';
import { ZTypedocTypeParametersViewer } from './typedoc-type-parameters-viewer';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Represents the properties for the ZTypedocSignatureListViewer component.
 */
export interface IZTypedocSignatureListViewerProps extends IZComponentEntityRedirect<number> {
  /**
   * The list of signatures for a method style entity.
   */
  signatures: IZTypedocEntity[];

  /**
   * The signature list owner.
   *
   * This is optional.  The signatures may include this object as well, but what appears in the header is the
   * information for this entity.
   */
  owner?: IZTypedocEntity;
}

const useSignatureListViewerStyles = makeStyles()((theme) => {
  const token = {
    'paddingLeft': theme.sizing.gaps.md,
    'paddingTop': theme.sizing.gaps.md,

    'h4': {
      marginLeft: `-${theme.sizing.gaps.md}`
    },

    '.ZTypedocFlagsViewer-root': {
      marginRight: theme.sizing.gaps.xs
    }
  };

  return {
    root: {
      padding: theme.sizing.gaps.sm,
      background: theme.palette.doc.subEntity,
      border: `${theme.sizing.thickness.xs} solid ${shade(theme.palette.doc.subEntity, -64)}`,

      h4: {
        fontSize: theme.sizing.font.md,
        fontWeight: 'bolder',
        textTransform: 'uppercase',
        marginBottom: theme.sizing.gaps.sm
      },

      strong: {
        fontWeight: 'bold'
      }
    },

    header: {
      'display': 'flex',
      'flexWrap': 'nowrap',
      'marginBottom': theme.sizing.gaps.md,
      'alignItems': 'center',

      '>*': {
        marginRight: theme.sizing.gaps.xs
      }
    },

    signatureList: {
      marginBottom: theme.sizing.gaps.md
    },

    signature: {
      'fontFamily': `${theme.fonts.fixed} !important`,
      'padding': theme.sizing.gaps.sm,
      'border': `${theme.sizing.thickness.xs} solid ${theme.palette.grey[500]}`,
      'borderBottomWidth': theme.sizing.thickness.none,
      'background': theme.palette.common.white,
      'color': theme.palette.common.black,

      '.MuiTypography-root': {
        fontFamily: theme.fonts.fixed
      },

      '&:last-child': {
        borderBottomWidth: theme.sizing.thickness.xs
      },

      '&.ZTypedocSignatureListViewer-signature-active': {
        background: 'whitesmoke'
      },

      '&.ZTypedocSignatureListViewer-signature-inactive': {
        cursor: 'pointer'
      }
    },

    parameterList: token,
    returns: token,
    inherits: token
  };
});

/**
 * Renders a signature list which allows for multiple signatures to be active at a time.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx to render the signature list.
 */
export function ZTypedocSignatureListViewer(props: IZTypedocSignatureListViewerProps) {
  const { signatures, owner, onEntity } = props;
  const expanded: { accessor?: string; signature: IZTypedocEntity }[] = useMemo(expandSignatures, [signatures]);
  const [active, setActive] = useState<IZTypedocEntity>(first(expanded)?.signature);
  const styles = useSignatureListViewerStyles();

  /**
   * Expands the property signatures.
   *
   * This looks for signature types that have child signatures.
   *
   * @returns The full signature list expanded and flattened.
   */
  function expandSignatures() {
    let current = signatures || [];
    current = current.filter((sig) => !!sig);

    let expanded: { accessor?: string; signature: IZTypedocEntity }[] = [];

    for (const sig of current) {
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
      <div className={`ZTypedocSignatureListViewer-signature-returns ${styles.classes.returns}`}>
        {createTypedocTypography('Returns', 'h4', 'h4')}
        <ZTypedocTypeViewer type={active.type} onEntity={onEntity} />
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
      <div className={`ZTypedocSignatureListViewer-signature-inherits ${styles.classes.inherits}`}>
        {createTypedocTypography(title, 'h4', 'h4')}
        <ZTypedocTypeViewer type={type} onEntity={onEntity} ignoreReferenceIds={true} />
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
        <ZTypedocTypeParametersViewer types={signature.typeParameter} onEntity={onEntity} />
        <ZTypedocTypeListViewer types={signature.extendedTypes} prefix=' extends ' prefixContainer='strong' onEntity={onEntity} />
        <ZTypedocTypeListViewer types={signature.implementedTypes} prefix=' implements ' prefixContainer='strong' onEntity={onEntity} />
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
      <div className={`ZTypedocSignatureListViewer-signature-parameter-list ${styles.classes.parameterList}`}>
        <Typography variant='h4'>Parameters</Typography>
        {params.map((param) => (
          <div className='ZTypedocSignatureListViewer-signature-parameter' key={param.id}>
            <ZTypedocFlagsViewer flags={param.flags} />
            {createTypedocTypography(param.name, 'strong')}
            <ZTypedocTypeViewer type={param.type} prefix=': ' onEntity={onEntity} />
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
        <ZTypedocTypeViewer type={signature.type} prefix={prefix} onEntity={onEntity} />
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
        <ZTypedocTypeParametersViewer types={signature.typeParameter} onEntity={onEntity} />
        {createTypedocTypography('(')}
        {params.map((parameter, i) => (
          <Fragment key={parameter.id}>
            {createTypedocTypography(get(parameter, 'flags.isRest') ? '...' : null)}
            {createTypedocTypography(parameter.name, 'strong')}
            {createTypedocTypography(get(parameter, 'flags.isOptional') ? '?' : null)}
            <ZTypedocTypeViewer type={parameter.type} prefix=': ' suffix={parameter.defaultValue ? ` = ${parameter.defaultValue}` : null} onEntity={onEntity} />
            {createTypedocTypography(i === params.length - 1 ? null : ', ')}
          </Fragment>
        ))}
        {createTypedocTypography(')')}
        <ZTypedocTypeViewer type={signature.type} prefix=': ' onEntity={onEntity} />
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
    let clasz = `ZTypedocSignatureListViewer-signature ${styles.classes.signature}`;
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
    return owner ? (
      <div className={`ZTypedocSignatureListViewer-header ${styles.classes.header}`}>
        <ZTypedocIcon kind={owner.kind} />
        <ZTypedocFlagsViewer flags={owner.flags} />
        {createTypedocTypography(owner.name, 'strong')}
      </div>
    ) : null;
  }

  if (!expanded.length) {
    return null;
  }

  return (
    <div className={`ZTypedocSignatureListViewer-root ${styles.classes.root}`} data-testid='ZTypedocSignatureListViewer-root'>
      {createHeader()}
      <div className={`ZTypedocSignatureListViewer-signature-list ${styles.classes.signatureList}`}>{expanded.map((sig, i) => createSignature(sig, i))}</div>
      <ZTypedocCommentViewer comment={pick(active.comment, 'text', 'shortText')} />
      {createParametersDocumentation()}
      {createReturnsDocumentation()}
      {createTypeInheritanceDocumentation(active.inheritedFrom, 'Inherited From')}
      {createTypeInheritanceDocumentation(active.implementationOf, 'Implementation Of')}
    </div>
  );
}
