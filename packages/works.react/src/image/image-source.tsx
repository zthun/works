import { ZDataUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { IZComponentSource } from '../component/component-source.interface';
import { IZComponentStyle } from '../component/component-style.interface';

export interface IZImageSourceProps extends IZComponentSource, IZComponentStyle {}

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
  const { className = '', src } = props;
  const clasz = `ZImageSource-root ${className}`;

  if (!src) {
    return <div className={clasz} />;
  }

  if (src.startsWith('data:image/svg+xml')) {
    // SVG images can go into html directly.
    const info = new ZDataUrlBuilder().parse(src).info();
    const __html = info.buffer.toString();
    return <div className={clasz} dangerouslySetInnerHTML={{ __html }} />;
  }

  return <img src={src} className={clasz} />;
}
