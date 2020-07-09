export interface IZProfileDeleteFormProps {
  headerText: string;
  subHeaderText: string;
  deleteText: string;

  loading: boolean;
  disabled: boolean;

  onDelete: () => void;
}
