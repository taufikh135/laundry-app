import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IonImg } from '@ionic/angular/standalone';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
  standalone: true,
  imports: [IonImg],
})
export class NavbarTopComponent implements OnInit {
  public navbarTopTitle: string = '';
  public whatsappRedirectUrl: string = '';

  constructor() {}

  ngOnInit() {
    this.navbarTopTitle = localStorage.getItem('navbarTopTitle') ?? '';
    this.whatsappRedirectUrl =
      localStorage.getItem('whatsappRedirectUrl') ?? '';
  }

  public redirectCs(): void {
    window.location.href = this.whatsappRedirectUrl;
  }

  public back(): void {
    history.back();
  }
}
