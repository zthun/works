export interface IZProfileDeactivationFormProps {
  headerText: string;
  subHeaderText: string;

  disabled: boolean;
  loading: boolean;

  warningText: string;
  deactivateText: string;

  onDeactivate: () => void;
}
