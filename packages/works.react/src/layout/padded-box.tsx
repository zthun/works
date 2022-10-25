import { cssClass, ZSizeFixed, ZSizeVoid } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { makeStyles } from '../theme/make-styles';

export interface IZPaddedBox extends IZComponentHierarchy, IZComponentStyle {
  padding: ZSizeFixed | ZSizeVoid;
}

const useBoxStyles = makeStyles<IZPaddedBox>()((theme, props) => {
  const { padding } = props;

  return {
    root: {
      padding: theme.gap(padding)
    }
  };
});

/**
 * Just a box.
 *
 * @param props
 *        The properties for the box
 *
 * @returns
 *        The JSX to render the box.
 */
export function ZPaddedBox(props: IZPaddedBox) {
  const { className, children } = props;
  const { classes } = useBoxStyles(props);

  const _className = cssClass('ZPaddedBox-root', className, classes.root);
  return <div className={_className}>{children}</div>;
}
