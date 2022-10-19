import { cssClass } from '@zthun/works.core';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { makeStyles } from '../theme/make-styles';
import { ZStateSize } from '../theme/state-size';

export interface IZGridLayout extends IZComponentStyle, IZComponentHierarchy {
  alignItems?: Property.AlignItems;
  gap?: ZStateSize;
  columns?: Property.GridTemplateColumns;
  rows?: Property.GridTemplateRows;
}

const useGridStyles = makeStyles<IZGridLayout>()((theme, props) => {
  const { alignItems, gap = ZStateSize.None, columns, rows } = props;

  return {
    grid: {
      display: 'grid',
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gap: theme.gap(gap),
      alignItems
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
