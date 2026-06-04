import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { Login } from './features/auth/pages/login/login';
import { Profile } from './features/profile/pages/profile/profile';
import { Dashboard } from './features/requests/pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'requests',
    component: Dashboard
  }
];