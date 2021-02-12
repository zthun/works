import { IZTypedocEntity } from '@zthun/works.core';

/**
 * Represents properties for the declaration viewer.
 */
export interface IZTypedocDeclarationViewerProps {
  /**
   * The declaration entity to render.
   */
  declaration: IZTypedocEntity;

  /**
   * Occurs when a sub entity is clicked.
   */
  onEntity(id: number): void;
}
