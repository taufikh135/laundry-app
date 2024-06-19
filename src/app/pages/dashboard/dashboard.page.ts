import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonContent,
  IonApp,
  IonCard,
} from '@ionic/angular/standalone';
import { NavbarBottomComponent } from 'src/app/components/navbar-bottom/navbar-bottom.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppApiService } from 'src/app/services/app-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonImg,
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    NavbarBottomComponent,
    FaIconComponent,
    HttpClientModule,
    RouterLink,
    RouterModule,
  ],
  providers: [LocalStorageService, AppApiService],
})
export class DashboardPage implements OnInit {
  public categories: any = [
    {
      code: '',
      name: 'Cuci & Strika',
      image_url: 'https://via.placeholder.com/100',
    },
    {
      code: '',
      name: 'Cuci',
      image_url: 'https://via.placeholder.com/100',
    },
    {
      code: '',
      name: 'Strika',
      image_url: 'https://via.placeholder.com/100',
    },
  ];

  public whatsappRedirectUrl = '';
  public user: any = {
    point: '0',
  };
  public infos: any = [
    {
      id: 1,
      title: 'Informasi',
      image_url: 'https://via.placeholder.com/100',
      redirect_url: '',
    },
  ];

  constructor(
    private library: FaIconLibrary,
    private localStorageService: LocalStorageService,
    private router: Router,
    private appApiService: AppApiService
  ) {
    this.library.addIconPacks(fas);

    this.appApiService.getContact('WA').subscribe({
      next: (value: any) => {
        this.whatsappRedirectUrl = value.data.redirect_url;
      },
    });
  }

  ngOnInit() {
    // get data kategori
    this.appApiService.getCategories().subscribe({
      next: (value: any) => {
        this.categories = value.data;
      },
    });

    this.appApiService.getInfos().subscribe({
      next: (value: any) => {
        this.infos = value.data;
      },
    });

    // get data user
    this.user = this.localStorageService.getItemJson('user');

    // perbarui data user setiap 30 detik
    setInterval(async () => {
      const request = await this.appApiService.getUserCurrent();

      request.subscribe({
        // jika request sukses
        next: (value: any) => {
          this.localStorageService.setItemJson('user', value.data);
          this.user.point = value.data.point;
        },
      });
    }, 30000);
  }

  public whatsappRedirect(): void {
    if (!this.whatsappRedirectUrl) {
      return;
    }

    window.location.href = this.whatsappRedirectUrl;
  }

  public goToCategory(code: string): void {
    const url = `categories/${code}`;
    this.router.navigateByUrl(url);
  }

  public goToInfo(url: string): void {
    console.log(url);
  }
}
