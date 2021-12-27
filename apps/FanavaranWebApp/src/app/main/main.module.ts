import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainRouting } from './main.routing'
import { MainComponent } from './main-body/body/main.component'


@NgModule({
  imports: [
    CommonModule,
    MainRouting
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule { }
