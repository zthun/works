import { IZProfileActivation } from '@zthun/works.core';

export interface IZProfileActivationFormProps {
  headerText: string;
  subHeaderText: string;
  activateText: string;
  reactivateText: string;

  disabled: boolean;
  loading: boolean;

  activation: IZProfileActivation;
  onActivationChange: (activation: IZProfileActivation) => void;
  onActivationCreate: () => void;
}
