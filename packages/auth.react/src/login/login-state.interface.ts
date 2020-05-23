import { Observable } from 'rxjs';

export interface IZLoginState {
  readonly logged: boolean;
  readonly change: Observable<boolean>;

  verify(): Promise<boolean>;
}
