import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonTabButton,
  IonButton,
  IonCheckbox,
  IonRouterLink,
  AlertController,
  IonTextarea,
} from '@ionic/angular/standalone';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FlashDataService } from 'src/app/services/flash-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppApiService } from 'src/app/services/app-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonCheckbox,
    IonButton,
    IonTabButton,
    IonItem,
    IonInput,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonCard,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonRouterLink,
    RouterLink,
    FormsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonTextarea,
  ],
})
export class RegisterPage implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', []),
    number_phone: new FormControl('', []),
    password: new FormControl('', []),
    password_confirmation: new FormControl('', []),
    syarat_ketentuan: new FormControl(undefined, []),
    address: new FormControl('', []),
  });

  public canClick = true;

  constructor(
    private router: Router,
    private alert: AlertController,
    private appApiService: AppApiService
  ) {}

  ngOnInit() {}

  public async submit(): Promise<void> {
    this.canClick = false;

    // check syarat ketentuan
    if (!this.form.get('syarat_ketentuan')?.value) {
      const alert = await this.alert.create({
        message: 'Harus menyetujui syarat dan ketentuan',
        buttons: ['Ok'],
      });
      alert.present();

      this.canClick = true;
      return;
    }

    const dataRequest = {
      name: this.form?.get('name')?.value ?? '',
      number_phone: this.form?.get('number_phone')?.value ?? '',
      password: this.form?.get('password')?.value ?? '',
      address: this.form?.get('address')?.value ?? '',
      password_confirmation:
        this.form?.get('password_confirmation')?.value ?? '',
    };

    this.appApiService.register(dataRequest).subscribe({
      next: async (value: any) => {
        this.canClick = true;
        const alert = await this.alert.create({
          header: 'Daftar telah berhasil.',
          message: 'Silahkan login.',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.router.navigate(['/auth/login']);
              },
            },
          ],
        });

        await alert.present();
      },

      // bad request
      error: (err) => {
        const errors = err.error.errors;

        // set errors
        this.form.setErrors(errors);

        // nyalakan tombol
        this.canClick = true;
      },
    });
  }
}
