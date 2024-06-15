import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonItem,
  IonModal,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarTopComponent } from 'src/app/components/navbar-top/navbar-top.component';
import { AppApiService } from 'src/app/services/app-api.service';
import { NavbarBottomComponent } from 'src/app/components/navbar-bottom/navbar-bottom.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonButton,
    IonButtons,
    IonModal,
    IonItem,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    NavbarTopComponent,
    IonSelect,
    IonSelectOption,
    NavbarBottomComponent,
  ],
  providers: [AppApiService],
})
export class CategoryPage implements OnInit {
  public typeModal: {
    name: string;
    description: string;
  } = {
    name: '',
    description: '',
  };
  public isModalOpen = false;
  public isOrderModalOpen = false;

  public types: Array<any> = [];
  public type: any;

  public products: Array<any> = [];
  public product: any;

  public services: Array<any> = [];
  public service: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appApiService: AppApiService
  ) {}

  ngOnInit() {
    localStorage.setItem('navbarTopTitle', 'Kategori');

    this.activatedRoute.params.subscribe({
      next: (value: any) => {
        const categoryCode = value.code;

        this.appApiService.getTypes(categoryCode).subscribe({
          next: (value: any) => {
            this.types = value.data;
          },
        });
      },
    });
  }

  public goToDetail(typeCode: string): void {
    const type = this.types.find((type) => type.code === typeCode);
    this.typeModal = {
      name: type.name,
      description: type.description,
    };
    this.isModalOpen = true;
  }

  public goToOrder(typeCode: string): void {
    // get type
    this.appApiService.getType(typeCode).subscribe({
      next: (value: any) => {
        this.type = value.data;
      },
    });

    // get products
    this.appApiService.getProducts(typeCode).subscribe({
      next: (value: any) => {
        this.products = value.data;
      },
    });

    // buka modal
    this.isOrderModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
    this.isOrderModalOpen = false;
  }

  public selectProduct(event: any): void {
    const productCode = event.detail.value;
    this.product = this.products.find(
      (product) => product.code === productCode
    );

    if (!productCode) return;

    this.appApiService.getServices(productCode).subscribe({
      next: (value: any) => {
        this.services = value.data;
      },
    });
  }

  public selectService(event: any): void {
    const serviceCode = event.detail.value;
    const service = this.services.find(
      (service) => service.code === serviceCode
    );
    this.service = service;
  }

  public submitOrder(): void {
    this.isOrderModalOpen = false;
  }
}
