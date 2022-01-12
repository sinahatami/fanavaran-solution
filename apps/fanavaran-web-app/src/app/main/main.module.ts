import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatMenuModule } from '@angular/material/menu'

import { MainRouting } from './main.routing'
import { MainComponent } from './main-body/body/main.component'
import { NavbarComponent } from './main-body/navbar/navbar.component'
import { MenuComponent } from './main-body/menu/menu.component'
import { ToggleFullscreenDirective } from './main-body/navbar/toggle-fullscreen.directive'


@NgModule({
  imports: [
    CommonModule,
    MainRouting,
    MatMenuModule
  ],
  declarations: [
    MainComponent,
    MenuComponent,
    NavbarComponent,
    ToggleFullscreenDirective
  ]
})
export class MainModule { }
