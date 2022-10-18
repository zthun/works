import { cssClass, firstDefined } from '@zthun/works.core';
import { ZDataUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { IZComponentDimensions2d } from '../component/component-dimensions-2d';
import { IZComponentSource } from '../component/component-source.interface';
import { IZComponentStyle } from '../component/component-style.';
import { makeStyles } from '../theme/make-styles';
import { ZStateSize } from '../theme/state-size';

export interface IZImageSourceProps extends IZComponentSource, IZComponentStyle, IZComponentDimensions2d {
  align?: 'left' | 'center' | 'right';
}

const useImageSourceStyles = makeStyles<IZImageSourceProps>()((theme, props) => {
  const { align = 'center' } = props;
  const height = theme.sizing.image[firstDefined(ZStateSize.Auto, props.height)];
  const width = theme.sizing.image[firstDefined(ZStateSize.Auto, props.width)];

  return {
    root: {
      textAlign: align,

      svg: {
        height,
        width
      },

      img: {
        height,
        width
      }
    }
  };
});

/**
 * Represents an image.
 *
 * This is a shortcut to placing an image tag, but it also supports svg data urls.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for this component.
 */
export function ZImageSource(props: IZImageSourceProps) {
  const { className, src } = props;
  const styles = useImageSourceStyles(props);
  const clasz = cssClass('ZImageSource-root', className, styles.classes.root);

  if (!src) {
    return <div className={clasz} />;
  }

  if (src.startsWith('data:image/svg+xml')) {
    // SVG images can go into html directly.
    const info = new ZDataUrlBuilder().parse(src).info();
    const __html = info.buffer.toString();
    return <div className={clasz} dangerouslySetInnerHTML={{ __html }} />;
  }

  return (
    <div className={clasz}>
      <img src={src} />
    </div>
  );
}
