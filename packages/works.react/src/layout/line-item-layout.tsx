import { cssClass, ZStateSize } from '@zthun/works.core';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.';
import { makeStyles } from '../theme/make-styles';

export interface IZLineItemLayout extends IZComponentStyle {
  prefix?: ReactNode | (() => ReactNode);
  body?: ReactNode | (() => ReactNode);
  suffix?: ReactNode | (() => ReactNode);
}

const useLineItemLayoutStyles = makeStyles()((theme) => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      width: '100%'
    },
    prefix: {
      flexGrow: 0,
      paddingRight: theme.gap(ZStateSize.Small)
    },

    body: {
      flexGrow: 1,
      flexBasis: 0
    },

    suffix: {
      flexGrow: 0,
      paddingLeft: theme.gap(ZStateSize.Small)
    }
  };
});

/**
 * Represents a simple flex 0-1-0 component.
 *
 * @param props
 *        The properties to the line item.
 *
 * @returns
 *        The JSX element to render the line item.
 *
 */
export function ZLineItemLayout(props: IZLineItemLayout) {
  const renderEmptySpace = (): ReactNode => null;
  const { className, prefix = renderEmptySpace, body = renderEmptySpace, suffix = renderEmptySpace } = props;
  const styles = useLineItemLayoutStyles();

  const _prefix = typeof prefix === 'function' ? prefix : () => prefix;
  const _body = typeof body === 'function' ? body : () => body;
  const _suffix = typeof suffix === 'function' ? suffix : () => suffix;

  return (
    <div className={cssClass('ZLineItemLayout-root', className, styles.classes.root)}>
      <div className={cssClass('ZLineItemLayout-prefix', styles.classes.prefix)}>{_prefix()}</div>
      <div className={cssClass('ZLineItemLayout-body', styles.classes.body)}>{_body()}</div>
      <div className={cssClass('ZLineItemLayout-suffix', styles.classes.suffix)}>{_suffix()}</div>
    </div>
  );
}
