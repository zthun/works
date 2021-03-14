import { IZProfileActivation } from '@zthun/works.core';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentLoading } from '../component/component-loading.interface';

/**
 * Represents properties for the profile activation form.
 */
export interface IZProfileActivationFormProps extends IZComponentLoading, IZComponentDisabled {
  headerText: string;
  subHeaderText: string;

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
