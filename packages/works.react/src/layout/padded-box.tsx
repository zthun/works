import { ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/works.chonky-cat';
import { cssClass, firstDefined } from '@zthun/works.core';
import { get } from 'lodash';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { makeStyles } from '../theme/make-styles';

export interface IZPaddedBox extends IZComponentHierarchy, IZComponentStyle {
  padding?:
    | ZSizeFixed
    | ZSizeVoid
    | {
        left?: ZSizeFixed | ZSizeVoid;
        right?: ZSizeFixed | ZSizeVoid;
        top?: ZSizeFixed | ZSizeVoid;
        bottom?: ZSizeFixed | ZSizeVoid;
      };
  margin?:
    | ZSizeFixed
    | ZSizeVaried.Fit
    | ZSizeVoid
    | {
        left?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
        right?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
        top?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
        bottom?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
      };
}

const useBoxStyles = makeStyles<IZPaddedBox>()((theme, props) => {
  const { padding, margin } = props;

  const pLeft = firstDefined(ZSizeVoid.None, get(padding, 'left'), padding);
  const pRight = firstDefined(ZSizeVoid.None, get(padding, 'right'), padding);
  const pTop = firstDefined(ZSizeVoid.None, get(padding, 'top'), padding);
  const pBottom = firstDefined(ZSizeVoid.None, get(padding, 'bottom'), padding);

  const mLeft = firstDefined(ZSizeVoid.None, get(margin, 'left'), margin);
  const mRight = firstDefined(ZSizeVoid.None, get(margin, 'right'), margin);
  const mTop = firstDefined(ZSizeVoid.None, get(margin, 'top'), margin);
  const mBottom = firstDefined(ZSizeVoid.None, get(margin, 'bottom'), margin);

  return {
    root: {
      paddingLeft: theme.gap(pLeft),
      paddingRight: theme.gap(pRight),
      paddingTop: theme.gap(pTop),
      paddingBottom: theme.gap(pBottom),
      marginLeft: theme.gap(mLeft),
      marginRight: theme.gap(mRight),
      marginTop: theme.gap(mTop),
      marginBottom: theme.gap(mBottom)
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
