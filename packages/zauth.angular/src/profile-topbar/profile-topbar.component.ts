import { Component, Input } from '@angular/core';
import { IZUser } from '@zthun/auth.core';

@Component({
  selector: 'z-profile-topbar',
  templateUrl: 'profile-topbar.component.html'
})
export class ZProfileTopbarComponent {
  @Input()
  public user: IZUser;
}
