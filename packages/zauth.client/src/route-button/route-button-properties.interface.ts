import { PropTypes } from '@material-ui/core';

export interface IZRouteButtonProperties {
  route: string;
  color: PropTypes.Color;
  disabled: boolean;
  children: any;
  variant?: 'text' | 'outlined' | 'contained';
}
