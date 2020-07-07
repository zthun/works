import { IZProfileActivation } from '@zthun/works.core';

export interface IZProfileActivationFormProps {
  headerText: string;
  subHeaderText: string;
  activateText: string;

  activation: IZProfileActivation;
  onActivationChange: (activation: IZProfileActivation) => void;
}
