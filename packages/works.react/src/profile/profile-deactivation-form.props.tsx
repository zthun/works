import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentLoading } from '../component/component-loading.interface';

export interface IZProfileDeactivationFormProps extends IZComponentDisabled, IZComponentLoading {
  headerText: string;
  subHeaderText: string;

  warningText: string;
  deactivateText: string;

  onDeactivate: () => void;
}
