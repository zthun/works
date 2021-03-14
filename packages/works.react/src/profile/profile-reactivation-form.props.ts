import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentLoading } from '../component/component-loading.interface';

/**
 * Represents properties for the reactivation form which is not a real form.
 */
export interface IZProfileReactivationFormProps extends IZComponentDisabled, IZComponentLoading {
  headerText: string;
  subHeaderText: string;

  /**
   * The description text for what the action does.
   */
  description: string;

  /**
   * The text for the action button.
   */
  reactivateText: string;

  /**
   * Occurs when the action button is clicked.
   */
  onReactivate: () => void;
}
