import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCheckbox,
  IonCardTitle,
  IonButton,
  IonCardContent,
  IonCardHeader,
  NavController,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppApiService } from '../../services/app-api.service';

@Component({
  selector: 'app-syarat-ketentuan',
  templateUrl: './syarat-ketentuan.page.html',
  styleUrls: ['./syarat-ketentuan.page.scss'],
  standalone: true,
  imports: [
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonCardTitle,
    IonCheckbox,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule,
  ],
  providers: [AppApiService],
})
export class SyaratKetentuanPage implements OnInit {
  public content = '';

  constructor(
    private navController: NavController,
    private appApiService: AppApiService
  ) {
    //
  }

  ngOnInit() {
    this.appApiService.getSyaratKetentuan().subscribe({
      next: (value: any) => {
        this.content = value.data.content;
        console.log(value.data.content);
      },
    });
  }

  public back(): void {
    this.navController.back();
  }
}
