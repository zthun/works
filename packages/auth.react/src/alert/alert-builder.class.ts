import { ZAlertSeverity } from './alert-severity.enum';
import { IZAlert } from './alert.interface';

export class ZAlertBuilder {
  private _alert: IZAlert;

  public constructor(message = '') {
    this._alert = {
      severity: ZAlertSeverity.Success,
      message,
      header: null
    };
  }

  public success(): this {
    this._alert.severity = ZAlertSeverity.Success;
    this._alert.header = this._alert.header || ZAlertSeverity.Success.toUpperCase();
    return this;
  }

  public info(): this {
    this._alert.severity = ZAlertSeverity.Info;
    this._alert.header = this._alert.header || ZAlertSeverity.Info.toUpperCase();
    return this;
  }

  public warning(): this {
    this._alert.severity = ZAlertSeverity.Warning;
    this._alert.header = this._alert.header || ZAlertSeverity.Warning.toUpperCase();
    return this;
  }

  public error(): this {
    this._alert.severity = ZAlertSeverity.Error;
    this._alert.header = this._alert.header || ZAlertSeverity.Error.toUpperCase();
    return this;
  }

  public message(message: string): this {
    this._alert.message = message;
    return this;
  }

  public header(header: string): this {
    this._alert.header = header;
    return this;
  }

  public assign(other: Partial<IZAlert>): this {
    this._alert = Object.assign(this._alert, other);
    return this;
  }

  public copy(other: IZAlert): this {
    this._alert = Object.assign({}, other);
    return this;
  }

  public build(): IZAlert {
    return { ...this._alert };
  }
}
