export interface IZProfileAvatarFormProps {
  headerText: string;
  subHeaderText: string;
  saveText: string;

  disabled: boolean;
  loading: boolean;

  avatar: string;
  onAvatarChange: (avatar: string) => void;
}
