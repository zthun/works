import React from 'react';
import { makeStyles } from '../theme/make-styles';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';

const useContentStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.sizing.gaps.xl
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
