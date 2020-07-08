export interface IZProfileReactivationFormProps {
  headerText: string;
  subHeaderText: string;
  description: string;
  reactivateText: string;

  disabled: boolean;
  loading: boolean;

  onReactivate: () => void;
}
