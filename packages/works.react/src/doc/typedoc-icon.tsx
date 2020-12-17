import ClassIcon from '@material-ui/icons/Class';
import TocIcon from '@material-ui/icons/Toc';
import NoteIcon from '@material-ui/icons/Note';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import FunctionsIcon from '@material-ui/icons/Functions';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { IZTypedocIconProps } from './typedoc-icon.props';

/**
 * Represents a view that maps an icon for a typedoc entity type.
 *
 * @param props The properties for this icon component.
 *
 * @returns The jsx for the icon.
 */
export function ZTypedocIcon(props: IZTypedocIconProps) {
  const className = `ZTypedocIcon-root ZTypedocIcon-${props.size}`;

  switch (props.kind) {
    case ZTypedocKind.Enum:
      return <TocIcon className={`${className} ZTypedocIcon-enumeration`} data-testid='ZTypedocIcon-enum' />;
    case ZTypedocKind.Class:
      return <ClassIcon className={`${className} ZTypedocIcon-class`} data-testid='ZTypedocIcon-class' />;
    case ZTypedocKind.Interface:
      return <NoteIcon className={`${className} ZTypedocIcon-interface`} data-testid='ZTypedocIcon-interface' />;
    case ZTypedocKind.TypeAlias:
      return <MergeTypeIcon className={`${className} ZTypedocIcon-type-alias`} data-testid='ZTypedocIcon-type-alias' />;
    case ZTypedocKind.Function:
    case ZTypedocKind.Method:
      return <FunctionsIcon className={`${className} ZTypedocIcon-function`} data-testid='ZTypedocIcon-function' />;
    default:
      return <Brightness1Icon className={`${className} ZTypedocIcon-bullet`} data-testid='ZTypedocIcon-bullet' />;
  }
}
