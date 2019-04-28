import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IZLogin, IZUser, ZUserBuilder } from '@zthun/auth.core';

/**
 * Represents a service that can be used to log a user into the system.
 */
@Injectable({
    providedIn: 'root'
})
export class ZLoginService {
    public constructor(private _http: HttpClient) { }

    public login(login: IZLogin): Promise<IZUser> {
        return Promise.resolve(new ZUserBuilder().user());
    }
}
