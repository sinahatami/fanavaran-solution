import { Component, HostListener } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridFormService } from '../../../grid-form.service';
import { Action } from '../../interfaces/action.interface';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  showDotIcon: boolean = false

  params
  label: string
  actions = []
  actionAccess = []
  component: string = ''

  agInit(params): void {
    //this.component = params.component
    this.params = params
    this.actions = this.params.actions
    this.actionAccess = this.params.actionAccess
    this.showAction()
  }

  editAction: Action
  deleteAction: Action
  printAction: Action
  orgTreeAction: Action
  costCenterTreeAction: Action
  accessAction: Action

  showAction() {
    this.actionAccess.includes("EditPolicy") ? this.editAction = this.actions.filter(a => a.label == "Edit")[0] : this.editAction = null

    this.actionAccess.includes("DeletePolicy") ? this.deleteAction = this.actions.filter(a => a.label == "Delete")[0] : this.deleteAction = null

    this.actions.includes("Print") ? this.printAction : this.printAction = null

    this.orgTreeAction = this.actions.filter(a => a.label == "OrgTree")[0]

    this.costCenterTreeAction = this.actions.filter(a => a.label == "CostCenterTree")[0]

    this.accessAction = this.actions.filter(a => a.label == "Access")[0]
  }

  @HostListener('mouseenter')
  mouseenter() {
    this.showDotIcon = true
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.showDotIcon = false
  }

  onClick(item, $event) { item.callback({ event: $event, rowData: this.params.node.data }) }

  miniLog: string
  getMiniLog() {
    !this.miniLog ?
      this.service.getMiniLog(`${this.params.controllerName}/GetMiniLog`, this.params.node.data.Id).subscribe((res: any) => {
        const data = res.Data
        this.miniLog = `نام کاربر: ${data.CreateUserID}\nتاریخ ایجاد: ${data.CreateDateTime}\nتاریخ آخرین تغییر: ${data.LastUpdateDateTime}\nنام کاربر آخرین تغییر: ${data.LastUpdateUserID}`
      })
      : null
  }

  showLog: boolean = false
  onShowLog() { this.showLog = true }

  onCloseLog() { this.showLog = false }

  refresh() { return true }

  constructor(private service: GridFormService) { }

}
