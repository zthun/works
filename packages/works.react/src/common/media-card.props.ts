import { IZComponentActionable } from './component-actionable.interface';
import { IZComponentHeader } from './component-header.interface';
import { IZComponentMedia } from './component-media.interface';

/**
 * Represents the properties for the ZMediaCard component.
 */
export interface IZMediaCardProps extends IZComponentHeader, IZComponentActionable, IZComponentMedia {}
