import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaygroundModule } from 'angular-playground';

PlaygroundModule.configure({
  selector: 'z-auth-angular-playground',
  overlay: false,
  modules: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ]
});

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
