import { Request } from 'oauth2-server';

export class ZRequest {
  public modified: Request;

  public constructor(public original: Request) {
    this.modified = new Request(original);
    this.modified.headers['content-type'] = 'x-www-form-urlencoded';
  }
}
