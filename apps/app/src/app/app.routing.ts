import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/providers/auth.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  //{ path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuardService] },
]

export const AppRouting = RouterModule.forRoot(routes, { useHash: true })
