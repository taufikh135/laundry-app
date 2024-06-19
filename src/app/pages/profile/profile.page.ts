import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonCard,
  IonTabButton,
  IonButton,
  AlertController,
} from '@ionic/angular/standalone';
import { AppApiService } from 'src/app/services/app-api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonTabButton,
    IonCard,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    RouterModule,
  ],
})
export class ProfilePage implements OnInit {
  public user: any = {
    name: '',
    number_phone: '',
    address: '',
  };

  constructor(
    private appApiService: AppApiService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    (await this.appApiService.getUserCurrent()).subscribe({
      next: (value: any) => {
        this.user = value.data;
      },
    });
  }

  public goBack(): void {
    history.back();
  }

  public async update() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin update profile?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
        },
        {
          text: 'Ya',
          handler: async () => {
            await this.updateProfile();
          },
        },
      ],
    });

    alert.present();
  }

  private async updateProfile() {
    const dataRequest = {
      name: this.user.name,
      address: this.user.address,
    };

    (await this.appApiService.updateUserCurrent(dataRequest)).subscribe({
      next: async (value: any) => {
        this.user = value.data;

        const alert = await this.alertController.create({
          header: 'Sukses',
          message: 'Update profile sukses.',
          buttons: ['OK'],
        });

        await alert.present();
      },
      error: async (err: any) => {
        console.log(err);
        const alert = await this.alertController.create({
          header: 'Gagal',
          message: 'Update profile gagal, Inputan anda tidak valid.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
