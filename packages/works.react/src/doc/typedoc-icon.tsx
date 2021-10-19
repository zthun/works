import Brightness1Icon from '@mui/icons-material/Brightness1';
import BuildIcon from '@mui/icons-material/Build';
import ClassIcon from '@mui/icons-material/Class';
import CloseIcon from '@mui/icons-material/Close';
import FunctionsIcon from '@mui/icons-material/Functions';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import NoteIcon from '@mui/icons-material/Note';
import TocIcon from '@mui/icons-material/Toc';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { IZTypedocIconProps } from './typedoc-icon.props';
import CodeIcon from '@mui/icons-material/Code';

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
    case ZTypedocKind.Constructor:
      return <BuildIcon className={`${className} ZTypedocIcon-constructor`} data-testid='ZTypedocIcon-constructor' />;
    case ZTypedocKind.Interface:
      return <NoteIcon className={`${className} ZTypedocIcon-interface`} data-testid='ZTypedocIcon-interface' />;
    case ZTypedocKind.TypeAlias:
      return <MergeTypeIcon className={`${className} ZTypedocIcon-type-alias`} data-testid='ZTypedocIcon-type-alias' />;
    case ZTypedocKind.Property:
      return <WidgetsIcon className={`${className} ZTypedocIcon-property`} data-testid='ZTypedocIcon-property' />;
    case ZTypedocKind.Accessor:
      return <LockOpenIcon className={`${className} ZTypedocIcon-accessor`} data-testid='ZTypedocIcon-accessor' />;
    case ZTypedocKind.Variable:
      return <CloseIcon className={`${className} ZTypedocIcon-variable`} data-testid='ZTypedocIcon-variable' />;
    case ZTypedocKind.Namespace:
      return <CodeIcon className={`${className} ZTypedocIcon-namespace`} data-testid='ZTypedocIcon-namespace' />;
    case ZTypedocKind.Function:
    case ZTypedocKind.Method:
      return <FunctionsIcon className={`${className} ZTypedocIcon-function`} data-testid='ZTypedocIcon-function' />;
    default:
      return <Brightness1Icon className={`${className} ZTypedocIcon-bullet`} data-testid='ZTypedocIcon-bullet' />;
  }
}

ZTypedocIcon.defaultProps = {
  size: 'auto'
};
