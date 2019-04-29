import { ZLoginService } from '../login/login.service';
import { ZLoginFormComponent } from './login-form.component';

describe('ZLoginFormComponent', () => {
    let service: ZLoginService;

    function createTestTarget() {
        return new ZLoginFormComponent(service);
    }

    beforeEach(() => {
        service = {} as ZLoginService;
        service.login = jest.fn();
    });
});
