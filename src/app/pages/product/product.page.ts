import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonApp,
  IonItem,
  IonImg,
  IonButton,
} from '@ionic/angular/standalone';
import { NavbarTopComponent } from 'src/app/components/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from 'src/app/components/navbar-bottom/navbar-bottom.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
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
    IonApp,
    NavbarTopComponent,
    NavbarBottomComponent,
  ],
})
export class ProductPage implements OnInit {
  public quantity = 0;
  public totalPrice = 0;

  constructor() {}

  ngOnInit() {}

  private calculateTotalPrice(): void {
    this.totalPrice = this.quantity * 30000;
  }

  public incrementQuantity(): void {
    this.quantity++;
    this.calculateTotalPrice();
  }

  public decrementQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }
}
