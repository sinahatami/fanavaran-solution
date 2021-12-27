import { LoginComponent } from './login/login.component'
import { Routes, RouterModule } from '@angular/router'

export const routes: Routes = [
  //{ path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
]

export const AuthRouting = RouterModule.forChild(routes)
