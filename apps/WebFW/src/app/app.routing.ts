import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
//import { AuthGuardService } from './auth/providers/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'a' },
  { path: 'a', component: AppComponent },]

export const AppRouting = RouterModule.forChild(routes)
