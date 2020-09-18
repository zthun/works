export interface IZProfileAvatarFormProps {
  headerText: string;
  subHeaderText: string;
  saveText: string;

  disabled: boolean;
  loading: boolean;

  avatar: Blob;
  onAvatarChange: (avatar: Blob) => void;
}
