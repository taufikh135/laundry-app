import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppApiService } from './services/app-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonicStorageModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [Storage, AppApiService, AuthService],
})
export class AppComponent {
  constructor(private appApiService: AppApiService) {
    this.appApiService.getContact('WA').subscribe({
      next: (value: any) => {
        const url = value.data.redirect_url;
        if (!localStorage.getItem('whatsappRedirectUrl')) {
          localStorage.setItem('whatsappRedirectUrl', url);
        }
      },
    });
  }
}
