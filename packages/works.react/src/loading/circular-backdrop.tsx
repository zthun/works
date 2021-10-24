import React from 'react';
import { makeStyles } from '../theme/make-styles';
import { IZCircularProgressProps, ZCircularProgress } from './circular-progress';

const useCircularBackdropStyles = makeStyles()((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.25
  }
}));

/**
 * Creates a circular progress spinner that is positioned absolutely and contains a backdrop to disable everything behind it.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx to render the component.
 */
export function ZCircularBackdrop(props: IZCircularProgressProps) {
  const { show = true } = props;
  const styles = useCircularBackdropStyles();

  return show ? (
    <div className={`ZCircularBackdrop-root ${styles.classes.root}`}>
      <div className={`ZCircularBackdrop-backdrop ${styles.classes.backdrop}`} />
      <ZCircularProgress {...props} />
    </div>
  ) : null;
}
