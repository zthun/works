import { IZNewUserState } from './new-user-state.interface';

export class ZNewUserState implements IZNewUserState {
  public email = '';
  public password = '';
  public confirm = '';
  public creating = false;
}
