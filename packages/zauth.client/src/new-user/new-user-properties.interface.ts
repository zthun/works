import { RouteComponentProps } from 'react-router';

export interface IZNewUserProperties extends RouteComponentProps {
  signInRoute: string;
  newUserEndpoint: string;
}
