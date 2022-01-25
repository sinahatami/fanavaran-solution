import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import 'ag-grid-enterprise'
import { CustomAgGridComponent } from './grid-body/custom-ag-grid.component'
import { ButtonRendererComponent } from './renderer/button-renderer/button-renderer.component'
import { CellRendererComponent } from './renderer/cell-renderer/cell-renderer.component'
import { CheckboxRendererComponent } from './renderer/checkbox-renderer/checkbox-renderer.component'
import { HeaderRendererComponent } from './renderer/header-renderer/header-renderer.component'
import { FloatFilterRendererComponent } from './renderer/float-filter-renderer/float-filter-renderer.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { LogComponent } from './log/log.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([HeaderRendererComponent, ButtonRendererComponent, CheckboxRendererComponent, CellRendererComponent, FloatFilterRendererComponent]),
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
  ],
  declarations: [
    CustomAgGridComponent,
    HeaderRendererComponent,
    ButtonRendererComponent,
    CheckboxRendererComponent,
    CellRendererComponent,
    FloatFilterRendererComponent,
    LogComponent
  ],
  exports: [CustomAgGridComponent,
  ],
  entryComponents: [CustomAgGridComponent]
})
export class CustomAgGridModule { }
