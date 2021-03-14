import { IZTypedocEntity } from '@zthun/works.core';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';

/**
 * Represents the properties for the ZTypedocSignatureListViewer component.
 */
export interface IZTypedocSignatureListViewerProps extends IZComponentEntityRedirect<number> {
  /**
   * The list of signatures for a method style entity.
   */
  signatures: IZTypedocEntity[];

  /**
   * The signature list owner.
   *
   * This is optional.  The signatures may include this object as well, but what appears in the header is the
   * information for this entity.
   */
  owner?: IZTypedocEntity;
}
