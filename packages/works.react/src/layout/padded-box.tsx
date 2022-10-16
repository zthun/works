import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { makeStyles } from '../theme/make-styles';
import { ZStateSize } from '../theme/state-size';

type ZStatePaddingSize = Exclude<ZStateSize, ZStateSize.Auto | ZStateSize.Max | ZStateSize.None>;

export interface IZPaddedBox extends IZComponentHierarchy, IZComponentStyle {
  padding: ZStatePaddingSize;
}

const useBoxStyles = makeStyles<IZPaddedBox>()((theme, props) => {
  const { padding } = props;

  const _padding = theme.sizing.gaps[padding];

  return {
    root: {
      padding: _padding
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
