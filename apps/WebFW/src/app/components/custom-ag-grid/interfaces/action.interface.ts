export interface Action {
  label: 'Add' | 'Excel' | 'Edit' | 'Delete' | 'Print'
  callback: Function
  hideExcel?: boolean
}
