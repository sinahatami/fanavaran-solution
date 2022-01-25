import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'

import { MainRouting } from './main.routing'
import { MainComponent } from './main-body/body/main.component'
import { NavbarComponent } from './main-body/navbar/navbar.component'
import { MenuComponent } from './main-body/menu/menu.component'
import { ToggleFullscreenDirective } from './main-body/navbar/toggle-fullscreen.directive'
import { MainConfig } from './main.config'


@NgModule({
  imports: [
    CommonModule,
    MainRouting,
    MatMenuModule,
    MatButtonModule,
  ],
  declarations: [
    MainComponent,
    MenuComponent,
    NavbarComponent,
    ToggleFullscreenDirective
  ]
})
export class MainModule { }
