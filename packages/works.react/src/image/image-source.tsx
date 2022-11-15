import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZSizeVaried
} from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import { ZDataUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentName } from '../component/component-name';
import { IZComponentSource } from '../component/component-source.interface';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { makeStyles } from '../theme/make-styles';

export interface IZImageSource
  extends IZComponentSource,
    IZComponentStyle,
    IZComponentWidth,
    IZComponentHeight,
    IZComponentName {}

const ImageSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem'),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss()
};

const useImageSourceStyles = makeStyles<IZImageSource>()((theme, props) => {
  const { height = ZSizeVaried.Fit, width = ZSizeVaried.Fit } = props;

  const _height = ImageSizeChart[height];
  const _width = ImageSizeChart[width];

  return {
    root: {
      height: _height,
      width: _width,

      svg: {
        height: _height,
        width: _width
      },

      img: {
        height: _height,
        width: _width
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
export function ZImageSource(props: IZImageSource) {
  const { className, src, name } = props;
  const styles = useImageSourceStyles(props);
  const clasz = cssClass('ZImageSource-root', className, styles.classes.root);

  if (!src) {
    return <div className={clasz} data-name={name} />;
  }

  if (src.startsWith('data:image/svg+xml')) {
    // SVG images can go into html directly.
    const info = new ZDataUrlBuilder().parse(src).info();
    const __html = info.buffer.toString();
    return <div className={clasz} dangerouslySetInnerHTML={{ __html }} data-name={name} />;
  }

  return (
    <div className={clasz} data-name={name}>
      <img src={src} alt={name} />
    </div>
  );
}
