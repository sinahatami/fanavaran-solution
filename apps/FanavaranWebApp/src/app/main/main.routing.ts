import { MainComponent } from './main-body/body/main.component';
import { AuthGuardService } from '../auth/providers/auth.guard';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        //  path: 'detail-info', loadChildren: () => import('./pages/detail-info/detail-info.module').then(m => m.DetailInfoModule),
        /* canActivate: [AuthGuardService] */
      },
    ]
  }
]

export const MainRouting = RouterModule.forChild(routes)
