import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthRouting } from './auth.routing'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { LoginComponent } from './login/body/login.component'
import { FooterComponent } from './login/footer/footer.component'
import { AuthService } from './providers/auth.service'

const MATERIALS = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthRouting,
    FormsModule,
    ReactiveFormsModule,
    MATERIALS
  ],
  declarations: [
    LoginComponent,
    FooterComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
