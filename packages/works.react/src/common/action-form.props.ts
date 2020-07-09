import { PropTypes } from '@material-ui/core';

export interface IZActionFormProps {
  className: string;
  headerText: string;
  subHeaderText: string;
  actionText: string;
  actionColor: PropTypes.Color;

  avatar: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];

  confirmation: React.ReactNode;
  yesText: string;
  noText: string;

  loading: boolean;
  disabled: boolean;

  onAction: () => void;
}
