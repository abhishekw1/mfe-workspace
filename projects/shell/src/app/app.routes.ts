import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { Home } from './home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'remote',
    loadComponent: () => loadRemoteModule('mfe1', './Component').then((m) => m.App),
  },
];
