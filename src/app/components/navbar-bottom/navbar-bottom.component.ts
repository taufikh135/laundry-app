import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss'],
  standalone: true,
  imports: [IonImg, RouterLink, RouterModule],
})
export class NavbarBottomComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
