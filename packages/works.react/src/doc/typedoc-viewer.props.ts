import { IZTypedoc } from '@zthun/works.core';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentLoading } from '../component/component-loading.interface';

/**
 * Represents the properties for the ZTypedocViewer component.
 */
export interface IZTypedocViewerProps extends IZComponentLoading, IZComponentHeader, IZComponentSizeable {
  /**
   * The typedoc to display.
   */
  typedoc: IZTypedoc;
}
