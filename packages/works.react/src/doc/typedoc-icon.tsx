import Brightness1Icon from '@mui/icons-material/Brightness1';
import BuildIcon from '@mui/icons-material/Build';
import ClassIcon from '@mui/icons-material/Class';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import FunctionsIcon from '@mui/icons-material/Functions';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import NoteIcon from '@mui/icons-material/Note';
import TocIcon from '@mui/icons-material/Toc';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { ZTypedocKind } from '@zthun/works.core';
import React from 'react';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { makeStyles } from '../theme/make-styles';

/**
 * The properties for the typedoc icon component.
 */
export interface IZTypedocIconProps extends IZComponentSizeable {
  /**
   * The kind of entity to retrieve the icon for.
   */
  kind: ZTypedocKind;
}

const useTypedocIconStyles = makeStyles<IZTypedocIconProps>()((theme, props) => {
  const sizes = {
    xs: '0.75rem',
    sm: '1rem',
    md: '3rem',
    lg: '5rem',
    xl: '7rem'
  };

  const fontSize = sizes[props.size];

  return {
    root: {
      'color': theme.palette.primary.main,
      fontSize,

      '&.MuiSvgIcon-root': {
        fontSize
      },

      '&.ZTypedocIcon-class': {
        color: theme.palette.doc.class
      },

      '&.ZTypedocIcon-enumeration': {
        color: theme.palette.doc.enumeration
      },

      '&.ZTypedocIcon-constructor': {
        color: theme.palette.doc.constructor
      },

      '&.ZTypedocIcon-property': {
        color: theme.palette.doc.property
      },

      '&.ZTypedocIcon-function': {
        color: theme.palette.doc.function
      },

      '&.ZTypedocIcon-interface': {
        color: theme.palette.doc.interface
      },

      '&.ZTypedocIcon-alias': {
        color: theme.palette.doc.alias
      },

      '&.ZTypedocIcon-accessor': {
        color: theme.palette.doc.accessor
      },

      '&.ZTypedocIcon-variable': {
        color: theme.palette.doc.variable
      },

      '&.ZTypedocIcon-namespace': {
        color: theme.palette.doc.namespace
      }
    }
  };
});

/**
 * Represents a view that maps an icon for a typedoc entity type.
 *
 * @param props The properties for this icon component.
 *
 * @returns The jsx for the icon.
 */
export function ZTypedocIcon(props: IZTypedocIconProps) {
  const { kind, size = 'auto' } = props;
  const styles = useTypedocIconStyles(props);

  const className = `ZTypedocIcon-root ZTypedocIcon-${size} ${styles.classes.root}`;

  switch (kind) {
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
