import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class DevPage implements OnInit {
  public urlServer: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  public submit(): void {
    environment.apiUrl = this.urlServer;
    this.router.navigateByUrl('/auth/login');
  }
}
