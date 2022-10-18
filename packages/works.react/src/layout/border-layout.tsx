import { cssClass, firstDefined } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';
import { makeStyles } from '../theme/make-styles';
import { ZStateSize } from '../theme/state-size';

export interface IZBorderLayout extends IZComponentWidth, IZComponentHierarchy, IZComponentStyle {
  border: Exclude<ZStateSize, ZStateSize.Auto | ZStateSize.None | ZStateSize.Max>;
}

const useBorderLayoutStyles = makeStyles<IZBorderLayout>()((theme, props) => {
  const border = `${theme.sizing.thickness[props.border]} solid`;
  const width = theme.sizing.card[firstDefined(ZStateSize.Max, props.width)];

  return {
    root: {
      border,
      width
    }
  };
});

/**
 * Represents a bordered box.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX for this component.
 */
export function ZBorderLayout(props: IZBorderLayout) {
  const { className, children } = props;
  const { classes } = useBorderLayoutStyles(props);
  const clasz = cssClass('ZBorderLayout-root', className, classes.root);

  return <div className={clasz}>{children}</div>;
}
