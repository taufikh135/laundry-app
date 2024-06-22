import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppApiService } from 'src/app/services/app-api.service';
import { environment } from 'src/environments/environment.prod';
import { PushNotificationService } from 'src/app/services/push-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    IonicStorageModule,
  ],
  providers: [AppApiService, AuthService, LocalStorageService],
})
export class LoginPage implements OnInit {
  public form = new FormGroup({
    number_phone: new FormControl('', []),
    password: new FormControl('', []),
  });

  public canClick = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private appApiService: AppApiService,
    private localStorageService: LocalStorageService,
    private pushNotificationService: PushNotificationService
  ) {}

  ngOnInit() {}

  public submit() {
    // klik button
    this.canClick = false;

    // data login
    const dataRequest: {
      number_phone: string;
      password: string;
    } = {
      number_phone: this.form.get('number_phone')?.value ?? '',
      password: this.form.get('password')?.value ?? '',
    };

    // api login
    this.appApiService.login(dataRequest).subscribe({
      // success
      next: async (value: any) => {
        this.authService.setToken(value.data.token);

        const request = await this.appApiService.getUserCurrent();
        request.subscribe({
          next: (value: any) => {
            this.localStorageService.setItemJson('user', value.data);

            const user: any = value.data;
            const fcmToken = this.pushNotificationService.getToken();

            const requestData: {
              address: string;
              name: string;
              fcm_token: string | null;
            } = {
              name: user.name,
              address: user.address,
              fcm_token: fcmToken,
            };

            this.appApiService.updateUserCurrent(requestData);
          },
        });

        this.router.navigateByUrl('dashboard');
        this.canClick = true;
      },
      error: (err) => {
        this.form.setErrors(err.error.errors);
        this.canClick = true;
      },
    });
  }
}
