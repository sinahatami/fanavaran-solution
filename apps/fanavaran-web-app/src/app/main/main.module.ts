import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainRouting } from './main.routing'
import { MainComponent } from './main-body/body/main.component'
import { HeaderComponent } from './main-body/header/header.component'
import { MenuComponent } from './main-body/menu/menu.component'


@NgModule({
  imports: [
    CommonModule,
    MainRouting
  ],
  declarations: [
    MainComponent,
    MenuComponent,
    HeaderComponent
  ]
})
export class MainModule { }
