import { IZProfile } from '@zthun/works.core';
import { Observable } from 'rxjs';

export interface IZLoginState {
  readonly profile?: IZProfile;
  readonly profileChange: Observable<IZProfile>;

  refresh(): Promise<IZProfile>;
}
