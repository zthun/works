import { ZSizeFixed, ZSizeVoid } from '@zthun/works.chonkify';
import { cssClass } from '@zthun/works.core';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { makeStyles } from '../theme/make-styles';

export interface IZGridLayout extends IZComponentStyle, IZComponentHierarchy {
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  gap?: ZSizeFixed | ZSizeVoid;
  columns?: Property.GridTemplateColumns;
  columnsLg?: Property.GridTemplateColumns;
  columnsMd?: Property.GridTemplateColumns;
  columnsSm?: Property.GridTemplateColumns;
  columnsXs?: Property.GridTemplateColumns;
  rows?: Property.GridTemplateRows;
}

const useGridStyles = makeStyles<IZGridLayout>()((theme, props) => {
  const {
    alignItems,
    justifyContent,
    gap = ZSizeVoid.None,
    columns,
    columnsLg = columns,
    columnsMd = columnsLg,
    columnsSm = columnsMd,
    columnsXs = columnsSm,
    rows
  } = props;

  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gap: theme.gap(gap),
      alignItems,
      justifyContent,

      [theme.breakpoints.down(ZSizeFixed.Large)]: {
        gridTemplateColumns: columnsLg
      },

      [theme.breakpoints.down(ZSizeFixed.Medium)]: {
        gridTemplateColumns: columnsMd
      },

      [theme.breakpoints.down(ZSizeFixed.Small)]: {
        gridTemplateColumns: columnsSm
      },

      [theme.breakpoints.down(ZSizeFixed.ExtraSmall)]: {
        gridTemplateColumns: columnsXs
      }
    }
  };
});

/**
 * Represents a layout that lines up items using CSS Grid.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX used to render this layout.
 */
export function ZGridLayout(props: IZGridLayout) {
  const { className, children } = props;
  const styles = useGridStyles(props);
  const gridClass = cssClass('ZGridLayout-root', className, styles.classes.grid);
  return <div className={gridClass}>{children}</div>;
}
