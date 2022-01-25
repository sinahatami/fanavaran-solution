import { RouterModule, Routes } from '@angular/router'
import { BranchComponent } from './pages/branch/branch.component'
import { GeneralBaseInfoComponent } from './pages/general-base-info/general-base-info.component'

export const routes: Routes = [
  { path: 'branch', component: BranchComponent },
  { path: 'general-base-info', component: GeneralBaseInfoComponent }
]

export const BaseInfoRouting = RouterModule.forChild(routes)
