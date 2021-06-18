import { IZProfileActivation } from '@zthun/works.core';
import { IZComponentDescription } from '../component/component-description.interface';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentLoading } from '../component/component-loading.interface';

/**
 * Represents properties for the profile activation form.
 */
export interface IZProfileActivationFormProps extends IZComponentLoading, IZComponentDisabled, IZComponentHeader, IZComponentDescription {
  /**
   * The text for the action button.
   */
  activateText: string;

  /**
   * The text label for the key field.
   */
  keyText: string;

  /**
   * The current activation entity.
   */
  activation: IZProfileActivation;

  /**
   * Occurs when the activation entity changes.
   *
   * @param activation The updated activation entity.
   */
  onActivationChange: (activation: IZProfileActivation) => void;
}
