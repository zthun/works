import { Observable } from 'rxjs';
import { IZAlert } from './alert.interface';

export interface IZAlertStack {
  readonly list: IZAlert[];
  readonly listChange: Observable<IZAlert[]>;
  readonly max: number;

  add(alert: IZAlert): boolean;
  remove(alert: IZAlert): boolean;
}
