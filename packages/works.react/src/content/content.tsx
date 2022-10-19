import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { makeStyles } from '../theme/make-styles';
import { ZStateSize } from '../theme/state-size';

const useContentStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.gap(ZStateSize.Large)
  }
}));

/**
 * Returns the jsx for root content.
 *
 * @param props The properties for the content.
 *
 * @returns The jsx for root content.
 */
export function ZContent(props: IZComponentHierarchy) {
  const styles = useContentStyles();

  return <article className={`ZContent-root ${styles.classes.root}`}>{props.children}</article>;
}
