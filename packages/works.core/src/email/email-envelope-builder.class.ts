import { IZEmailContact } from './email-contact.interface';
import { IZEmailEnvelope } from './email-envelope.interface';

export class ZEmailEnvelopeBuilder {
  private _envelope: IZEmailEnvelope;

  public constructor() {
    this._envelope = {
      from: null
    };
  }

  public from(val: IZEmailContact | string): this {
    this._envelope.from = val;
    return this;
  }

  public to(val: IZEmailContact | string): this {
    this._envelope.to = this._envelope.to || [];
    this._envelope.to.push(val);
    return this;
  }

  public tos(val: Array<IZEmailContact | string>): this {
    this._envelope.to = val;
    return this;
  }

  public cc(val: IZEmailContact | string): this {
    this._envelope.cc = this._envelope.cc || [];
    this._envelope.cc.push(val);
    return this;
  }

  public ccs(val: Array<IZEmailContact | string>): this {
    this._envelope.cc = val;
    return this;
  }

  public bcc(val: IZEmailContact | string): this {
    this._envelope.bcc = this._envelope.bcc || [];
    this._envelope.bcc.push(val);
    return this;
  }

  public bccs(val: Array<IZEmailContact | string>): this {
    this._envelope.bcc = val;
    return this;
  }

  public assign(other: Partial<IZEmailEnvelope>): this {
    this._envelope = Object.assign({}, this._envelope, other);
    this._envelope = JSON.parse(JSON.stringify(this._envelope));
    return this;
  }

  public copy(other: IZEmailEnvelope): this {
    this._envelope = JSON.parse(JSON.stringify(other));
    return this;
  }

  public build(): IZEmailEnvelope {
    return JSON.parse(JSON.stringify(this._envelope));
  }
}
