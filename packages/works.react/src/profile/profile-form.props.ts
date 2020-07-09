import { IZProfile } from '@zthun/works.core';

export interface IZProfileFormProps {
  hideAccountInformation: boolean;
  hidePassword: boolean;

  headerText: string;
  subHeaderText: string;
  saveText: string;
  accountInformationHeaderText: string;
  passwordHeaderText: string;

  loading: boolean;
  disabled: boolean;

  profile: IZProfile;
  onProfileChange: (profile: IZProfile) => void;
}
