import { IZComponentSource } from '../component/component-source.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import React from 'react';
import { makeStyles } from '../theme/make-styles';

/**
 * Represents the properties for a paper card avatar.
 */
export interface IZCardAvatarProps extends IZComponentSizeable, IZComponentSource {}

const SizeChart = {
  xs: '2em',
  sm: '3em',
  md: '4em',
  lg: '5em',
  xl: '6em'
};

const useCardAvatarStyles = makeStyles<IZCardAvatarProps>()((_, props) => {
  const { size = 'auto' } = props;

  return {
    root: {
      width: SizeChart[size]
    }
  };
});

/**
 * Represents a helper component that can display an avatar of a given size.
 *
 * Usage of this is optional.  You can opt to use your own image if needed,
 * but this has support for sizing the image based on the zthunworks size
 * themes.
 *
 * @param props The properties to the component.
 *
 * @returns The jsx that renders the avatar.
 */
export function ZCardAvatar(props: IZCardAvatarProps) {
  const { src, size = 'auto' } = props;
  const styles = useCardAvatarStyles(props);

  return <img className={`ZCardAvatar-root ZCardAvatar-${size} ${styles.classes.root}`} src={src} />;
}
