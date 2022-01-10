import { NgModule } from '@angular/core'
import { LoaderComponent } from './loader.component'
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner'
import { LoaderService } from './loader.service'
import { CommonModule } from '@angular/common'


@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent,
    NgxSpinnerModule
  ],
  providers: [
    NgxSpinnerService,
    LoaderService
  ]
})
export class LoaderModule { }
