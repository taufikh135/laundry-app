import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AppApiService } from './app-api.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private keyToken: string = 'fcmToken';

  constructor(private appApiService: AppApiService) {
    this.init();
  }

  private async init(): Promise<void> {
    const permisionStatus = await PushNotifications.requestPermissions();

    if (permisionStatus.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    }

    PushNotifications.addListener('registration', (token: Token) => {
      localStorage.setItem(this.keyToken, token.value);
    });
  }

  public getToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }
}
