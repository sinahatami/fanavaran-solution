import { Action } from "./action.interface"

export class CustomGridOption {
  columnDefs: any
  rowData: any[]

  actions?: Action[]
  headers?: any

  controllerName: string
  EntityName: string

  hideButtons?: boolean
  rowClassRules?: Function


  contextMenu?: typeof ContextMenu[]

  rowClicked?: Function
  rowDoubleClicked?: Function
  rowSelected?: Function

  checkboxSelection?: boolean
  selectedRowCheckboxData: any[]

  autoGroupColumnDef?: any
}

export const ContextMenu = 'employee'
