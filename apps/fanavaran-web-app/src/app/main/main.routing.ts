import { MainComponent } from './main-body/body/main.component'
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from '../auth/providers/auth.guard';

export const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'pages',
    component: MainComponent,
    children: [
      {
        path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [/* AuthGuardService */]
      }
    ]
  }
]

export const MainRouting = RouterModule.forChild(routes)
