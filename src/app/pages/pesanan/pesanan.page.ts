import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonImg,
  IonButton,
} from '@ionic/angular/standalone';
import { NavbarTopComponent } from 'src/app/components/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from 'src/app/components/navbar-bottom/navbar-bottom.component';
import { AppApiService } from 'src/app/services/app-api.service';

@Component({
  selector: 'app-pesanan',
  templateUrl: './pesanan.page.html',
  styleUrls: ['./pesanan.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonImg,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    NavbarTopComponent,
    NavbarBottomComponent,
  ],
})
export class PesananPage implements OnInit {
  constructor(private appApiService: AppApiService) {}

  ngOnInit() {
    localStorage.setItem('navbarTopTitle', 'Pesanan');
  }
}
