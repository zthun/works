import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';

/**
 * Returns the jsx for root content.
 *
 * @param props The properties for the content.
 *
 * @returns The jsx for root content.
 */
export function ZContent(props: IZComponentHierarchy) {
  return <article className='ZContent-root'>{props.children}</article>;
}
