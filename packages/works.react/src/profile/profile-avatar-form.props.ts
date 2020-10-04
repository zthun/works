export interface IZProfileAvatarFormProps {
  headerText: string;
  subHeaderText: string;
  saveText: string;
  clearText: string;
  maxSize: number;

  disabled: boolean;
  loading: boolean;

  avatar: string;
  onAvatarChange: (avatar: string) => void;
}
