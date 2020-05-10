import { Observable } from 'rxjs';
import { IZAlert } from './alert.interface';

export interface IZAlertStack {
  readonly list: IZAlert[];
  readonly max: number;
  readonly change: Observable<IZAlert[]>;

  add(alert: IZAlert): boolean;
  remove(alert: IZAlert): boolean;
}
