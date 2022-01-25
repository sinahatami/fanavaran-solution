import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BaseInfoRouting } from './base-info.routing'
import { BranchComponent } from './pages/branch/branch.component'
import { GeneralBaseInfoComponent } from './pages/general-base-info/general-base-info.component'


@NgModule({
  imports: [
    CommonModule,
    BaseInfoRouting
  ],
  declarations: [
    BranchComponent,
    GeneralBaseInfoComponent
  ]
})
export class BaseInfoModule { }
