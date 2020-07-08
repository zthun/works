export interface IZProfileReactivationFormProps {
  headerText: string;
  subHeaderText: string;
  reactivateText: string;

  disabled: boolean;
  loading: boolean;

  onReactivate: () => void;
}
