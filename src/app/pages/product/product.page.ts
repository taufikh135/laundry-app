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
import { AppApiService } from 'src/app/services/app-api.service';
import { ActivatedRoute } from '@angular/router';

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
  providers: [AppApiService],
})
export class ProductPage implements OnInit {
  public quantity = 0;
  public totalPrice = 0;
  public products: Array<any> = [];
  public type: any;

  constructor(
    private appApiService: AppApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    localStorage.setItem('navbarTopTitle', 'Produk');

    this.activatedRoute.params.subscribe({
      next: (value: any) => {
        const typeCode = value.code;

        this.getType(typeCode);
        this.getProducts(typeCode);
      },
    });
  }

  private getType(typeCode: string): void {
    this.appApiService.getType(typeCode).subscribe({
      next: (value: any) => {
        this.type = value.data;
      },
    });
  }

  private getProducts(typeCode: string) {
    this.appApiService.getProducts(typeCode).subscribe({
      next: (value: any) => {
        this.products = value.data;
        this.products = this.products.map((product) => {
          product.quantity = 0;
          return product;
        });
      },
    });
  }

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
