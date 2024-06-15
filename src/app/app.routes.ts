import { Routes } from '@angular/router';
import { isLoginGuard } from './guards/is-login.guard';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';
import { RegisterPage } from './pages/auth/register/register.page';
import { LoginPage } from './pages/auth/login/login.page';
import { VerificationPage } from './pages/auth/verification/verification.page';
import { ForgotPasswordPage } from './pages/auth/forgot-password/forgot-password.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { NavbarBottomComponent } from './components/navbar-bottom/navbar-bottom.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'syarat-ketentuan',
    loadComponent: () =>
      import('./pages/syarat-ketentuan/syarat-ketentuan.page').then(
        (m) => m.SyaratKetentuanPage
      ),
  },

  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterPage,
      },

      {
        path: 'login',
        component: LoginPage,
      },

      {
        path: 'verification',
        component: VerificationPage,
      },

      {
        path: 'forgot-password',
        component: ForgotPasswordPage,
      },
    ],
  },

  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [isLoginGuard],
    providers: [Storage, AuthService],
  },
  {
    path: 'categories/:code',
    loadComponent: () =>
      import('./pages/category/category.page').then((m) => m.CategoryPage),
  },
];
