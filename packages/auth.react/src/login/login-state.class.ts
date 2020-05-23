import { Subject } from 'rxjs';
import { IZLoginState } from './login-state.interface';

export class ZLoginState implements IZLoginState {
  public logged = null;
  public change = new Subject<boolean>();

  public constructor(private verifyFn: () => Promise<boolean>) {
    this.verify();
  }

  public async verify() {
    if (this.logged != null) {
      this.logged = null;
      this.change.next(null);
    }

    this.logged = await this.verifyFn();
    this.change.next(this.logged);
    return this.logged;
  }
}
