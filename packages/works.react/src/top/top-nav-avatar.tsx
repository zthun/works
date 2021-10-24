import React from 'react';
import { IZComponentSource } from '../component/component-source.interface';
import { makeStyles } from '../theme/make-styles';

const useTopNavAvatarStyles = makeStyles()((theme) => ({
  root: {
    height: '5rem',
    marginRight: theme.sizing.gaps.sm,
    borderRadius: theme.rounding.circle,
    border: `${theme.sizing.thickness.xs} solid ${theme.palette.grey[200]}`,
    background: theme.palette.common.white
  }
}));

/**
 * Represents an avatar that can be placed in the top nav home button.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that can render the avatar.
 */
export function ZTopNavAvatar(props: IZComponentSource) {
  const { src } = props;
  const styles = useTopNavAvatarStyles();

  return <img className={`ZTopNavAvatar-root ${styles.classes.root}`} data-testid='ZTopNavAvatar-root' src={src} />;
}
