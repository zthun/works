export interface IZProfileAvatarFormProps {
  headerText: string;
  subHeaderText: string;
  saveText: string;

  disabled: boolean;
  loading: boolean;

  avatar: Buffer;
  onAvatarChange: (avatar: Buffer) => void;
}
