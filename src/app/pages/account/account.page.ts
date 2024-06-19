import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonImg,
  IonLabel,
  IonItem,
  AlertController,
} from '@ionic/angular/standalone';
import { NavbarTopComponent } from 'src/app/components/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from 'src/app/components/navbar-bottom/navbar-bottom.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppApiService } from 'src/app/services/app-api.service';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonImg,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    NavbarTopComponent,
    NavbarBottomComponent,
    FaIconComponent,
    RouterLink,
  ],
  providers: [AuthService, AppApiService],
})
export class AccountPage implements OnInit {
  public user: any = {
    name: 'A',
    address: '',
    number_phone: '',
  };

  public socialMedias: Array<{
    id: number;
    name: string;
    url: string;
  }> = [];

  public customerServiceUrl: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private appApiService: AppApiService,
    private faIconLibrary: FaIconLibrary,
    private alertController: AlertController
  ) {
    this.faIconLibrary.addIconPacks(fas);
  }

  async ngOnInit() {
    (await this.appApiService.getUserCurrent()).subscribe({
      next: (value: any) => {
        this.user = value.data;
      },
    });

    this.appApiService.getContact('WA').subscribe({
      next: (value: any) => {
        this.customerServiceUrl = value.data.redirect_url;
      },
    });

    this.appApiService.getSocialMedias().subscribe({
      next: (value: any) => {
        this.socialMedias = value.data;
      },
    });
  }

  public async goToLogout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Apakah anda yakin ingin logout?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
        },
        {
          text: 'Ya',
          handler: async () => {
            await this.authService.removeToken();
            this.router.navigateByUrl('auth/login');
          },
        },
      ],
    });

    alert.present();
  }

  public goBack(): void {
    history.back();
  }

  public goToHelp(): void {
    window.open(this.customerServiceUrl, '_blank');
  }

  public goToSocialMedia(url: string): void {
    window.open(url, '_blank');
  }
}
