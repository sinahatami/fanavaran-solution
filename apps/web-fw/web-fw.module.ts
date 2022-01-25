import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomAgGridModule } from './custom-ag-grid/custom-ag-grid.module'
import { CustomModalModule } from './custom-modal/custom-modal.module'


@NgModule({
  imports: [
    CommonModule,
    CustomAgGridModule,
    CustomModalModule
  ],
  declarations: [],
})
export class WebFWModule { }
