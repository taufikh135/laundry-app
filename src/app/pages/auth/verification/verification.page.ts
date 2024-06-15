import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  AlertController,
  IonInput,
} from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AppApiService } from 'src/app/services/app-api.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    HttpClientModule,
    RouterLink,
  ],
  providers: [AppApiService],
})
export class VerificationPage implements OnInit {
  public form = new FormGroup({
    number_phone: new FormControl('', []),
  });
  public canSubmit = true;
  public buttonContent = 'Kirim Link Verifikasi';

  constructor(
    private alertController: AlertController,
    private appApiService: AppApiService
  ) {
    //
  }

  ngOnInit() {
    //
  }

  public submit() {
    this.canSubmit = false;
    const dataRequest: { number_phone: any } = {
      number_phone: this.form.get('number_phone')?.value,
    };

    this.appApiService.verification(dataRequest).subscribe({
      next: async (value: any) => {
        let count = 30;

        const interval = setInterval(() => {
          if (count > 0) {
            count--;
            this.buttonContent = `${count} detik`;
          } else {
            this.canSubmit = true;
            this.buttonContent = 'Kirim Link Verifikasi';
            clearInterval(interval);
          }
        }, 1000);

        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Silahkan cek whatsapp anda',
          buttons: ['OK'],
        });
        await alert.present();
      },

      error: async (err) => {
        console.log(err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error.errors.number_phone[0],
          buttons: ['OK'],
        });

        await alert.present();

        this.canSubmit = true;
      },
    });
  }
}
