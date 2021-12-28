import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-cell-renderer',
  templateUrl: './cell-renderer.component.html',
  styleUrls: ['./cell-renderer.component.scss']
})
export class CellRendererComponent implements ICellRendererAngularComp {

  cellValue: any
  type: string
  agInit(params): void {
    this.cellValue = params.value
    this.type = params.type
  }

  refresh() { return true }

}
