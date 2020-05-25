import { IZProfile } from '@zthun/auth.core';

export interface IZProfileFormProps {
  hideDisplay: boolean;
  hideEmail: boolean;
  hidePassword: boolean;
  hideNewPassword: boolean;
  hideConfirm: boolean;

  headerText: string;
  subHeaderText: string;
  actionText: string;

  loading: boolean;
  disabled: boolean;

  profile: IZProfile;
  onProfileChange: (profile: IZProfile) => void;
}
