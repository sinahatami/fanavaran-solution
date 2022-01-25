import { Action } from '../interfaces/action.interface'
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { GridOptions, SideBarDef } from 'ag-grid-community'
import { ButtonRendererComponent } from '../renderer/button-renderer/button-renderer.component'
import { FloatFilterRendererComponent } from '../renderer/float-filter-renderer/float-filter-renderer.component'
import { CellRendererComponent } from '../renderer/cell-renderer/cell-renderer.component'
import { CheckboxRendererComponent } from '../renderer/checkbox-renderer/checkbox-renderer.component'
import { HeaderRendererComponent } from '../renderer/header-renderer/header-renderer.component'
import { CustomGridOption } from '../interfaces/ag-grid-option.interface'

@Component({
  selector: 'custom-ag-grid',
  templateUrl: './custom-ag-grid.component.html',
  styleUrls: ['./custom-ag-grid.component.scss']
})
export class CustomAgGridComponent implements OnInit {

  @Input() customGridOption: CustomGridOption
  @Input() formType: string
  @Input() disabledForm: boolean
  @Input() hideLogs: boolean
  @Input() rowNumber: number
  @Input() report: boolean

  gridOption = <GridOptions>{
    suppressRowTransform: true,
    animateRows: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    sideBar: sideBar,
    defaultColDef: defaultColDef,
    frameworkComponents: frameworkComponents,
    enableRtl: true,
    localeText: localeText,
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    rowSelection: 'single',
    //onRowClicked: this.rowClicked.bind(this),
    onRowDoubleClicked: this.rowDoubleClicked.bind(this),
    onFilterChanged: this.filterChanged.bind(this),
    onCellClicked: this.rowClicked.bind(this),
    onRowSelected: this.rowSelected.bind(this),
    onToolPanelVisibleChanged: this.gridSizeChanged.bind(this),
    onGridSizeChanged: this.gridSizeChanged.bind(this),
    rowHeight: 20,
    pagination: true
    /* rowClassRules: {
          signatured: function (params) {
        if (params.data == undefined) return
        if (params && params.data && params.data.CommStatusID) {
          let CommStatusID = params.data.CommStatusID
          let isSignatured = CommStatusID == 303 || CommStatusID == 305
          return isSignatured
        }
      },
    }, */
  }

  selectingRowCheckbox() { this.customGridOption.selectedRowCheckboxData && this.customGridOption.selectedRowCheckboxData.length != 0 ? this.gridOption.api.forEachNode((node) => this.customGridOption.selectedRowCheckboxData.forEach(e => node.setSelected(node.data === e))) : null }

  rowClicked(event) { event?.column?.colId !== 'actions' && this.customGridOption.rowClicked ? this.customGridOption.rowClicked(event) : null }

  rowDoubleClicked(event) { event.data && this.customGridOption.rowDoubleClicked ? this.customGridOption.rowDoubleClicked(event) : null }

  filterChanged() { this.gridOption.api.setRowData(this.gridOption.rowData) }

  gridSizeChanged() {
    if (!this.gridOption.api) return
    let gridApi: any = this.gridOption.api
    let width = gridApi.gridPanel.eBodyViewport.clientWidth
    if (width > 0) this.gridOption.api.sizeColumnsToFit()
  }

  setGrid() {
    this.customGridOption.rowData[0].Id != 0 ? this.gridOption.rowData = this.customGridOption.rowData : null
    let columnObj = this.customGridOption.columnDefs.EntityAttribute

    let keyArray = []
    keyArray = Object.keys(this.customGridOption.rowData[0])

    const filteredColumnKey = Object.keys(columnObj).filter(key => keyArray.includes(key)).reduce((obj, key) => {
      obj[key] = columnObj[key]
      return obj
    }, {})

    const filteredColumnValue = Object.values(filteredColumnKey).filter((a: any) => !a.hiddenInGrid)
    this.gridOption.columnDefs = filteredColumnValue

    this.gridOption.columnDefs.map((a: any) => {
      a.type == 'int' ? a.valueFormatter = (params) => {
        if (params.value) return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      } : null
      a.headerTooltip = a.headerName, a.tooltipField = a.field, a.floatingFilterComponent = 'floatfilter', a.filter = 'agTextColumnFilter'
      a.type == 'bool' ? a.cellRendererFramework = CheckboxRendererComponent : a.cellRendererFramework = CellRendererComponent, a.cellRendererParams = { type: a.type }
      a.width != 0 ? a.maxWidth = a.width : a.width = null
    })

    const actions: Action[] = this.customGridOption.actions
    actions ? this.gridOption.columnDefs.push({
      headerName: 'actions',
      headerComponentParams: { actions: actions, actionAccess: this.customGridOption.columnDefs.EntityAccess },
      cellRenderer: 'buttonRenderer',
      cellRendererParams: { hideLogs: this.hideLogs, actions: actions, controllerName: this.customGridOption.controllerName, tableName: this.customGridOption.columnDefs.EntityAttribute.EntityName, actionAccess: this.customGridOption.columnDefs.EntityAccess },
      filter: false,
      lockPinned: true,
      pinned: 'left',
      colId: 'actions',
      maxWidth: 30,
      //  autoHeight: true
    }) : null

    this.customGridOption.checkboxSelection ? this.setCheckboxSelection() : delete this.gridOption.defaultColDef.headerCheckboxSelection
  }

  setCheckboxSelection() {
    this.gridOption.rowSelection = 'multiple'
    Object.assign(this.gridOption.columnDefs[0], {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    })
    this.formType != '' ? Object.assign(this.gridOption.defaultColDef, { headerCheckboxSelection: setFirstColumn }) : null
  }

  rowSelected(event) { if (this.customGridOption.rowSelected) this.customGridOption.rowSelected(event) }

  constructor() { }

  ngOnInit(): void {
    this.setGrid()
  }

  theme: string = ''
  ngAfterViewInit(): void {
    this.setRowData()
    // if (this.customGridOption.contextMenu) this.setContextMenu()
    this.selectingRowCheckbox()
  }

  gridLen: number = 0
  setRowData() {
    this.gridOption.api.setRowData(this.gridOption.rowData)
    // this.gridOption.api.setDomLayout("autoHeight");
  }

  @ViewChild('divGrid', { static: false }) divGrid: ElementRef
  onPageSizeChanged(index) { this.divGrid.nativeElement.firstElementChild.style.height = Number(index) * 20 + 75 + 'px' }

  @Input() signalRChange: string
  ngOnChanges(UpdatedValue: any): void {
    if (UpdatedValue['signalRChange'] && UpdatedValue['signalRChange'].currentValue) {
      this.setRowData()
      //   this.gridOption.api.refreshClientSideRowModel();
    }
  }
}

function setFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

const defaultColDef = {
  floatingFilter: true,
  enableRowGroup: true,
  enablePivot: true,
  enableValue: true,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: false,
  minWidth: 160,
  filterParams: { newRowsAction: 'keep' },
}

const sideBar: SideBarDef = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    }
  ],
  position: 'left',
}

const localeText = {
  group: 'گروه',
  equals: 'برابر',
  notEqual: 'برابر نباشد',
  contains: 'شامل',
  notContains: 'شامل نباشد',
  startsWith: 'جستجو براساس حرف اول',
  endsWith: 'جستجو براساس حرف آخر',
  andCondition: 'و',
  orCondition: 'یا',
  filterOoo: 'فیلتر',
  or: 'یا',
  of: 'از',
  page: 'صفحه',
  to: 'تا',
  noRowsToShow: 'اطلاعاتی یافت نشد!',
  pinColumn: 'برچسب ستون',
  pinLeft: 'برچسب چپ',
  pinRight: 'برچسب راست',
  noPin: 'بدون برچسب',
  autosizeThiscolumn: 'تنظیم سایز این ستون',
  autosizeAllColumns: 'تنظیم سایز همه ستون ها',
  groupBy: 'گروه بندی',
  resetColumns: 'تنظیمات اولیه ستون ها',
  selectAll: 'انتخاب همه',
  searchOoo: 'جستجو...',
  rowGroupColumnsEmptyMessage: 'ستون را برای گروه بندی بکشید',
  pivotColumnsEmptyMessage: 'مقدار را به اینجا بکشید',
  columns: 'ستون ها',
  filters: 'فیلتر ها',
  blanks: 'خالی',
  pivotMode: 'مد محوری',
  loadingOoo: 'در حال بارگذاری',
  groups: 'گروه ها',
  values: 'مقادیر',
  valueColumnsEmptyMessage: 'مقدار را برای تجمع بکشید',
  copy: 'کپی',
  copyWithHeaders: 'کپی با عنوان',
  paste: 'جا گذاری',
  export: 'صادر',
  csvExport: 'فایل با فرمت CSV',
  excelExport: 'فایل با فرمت Excel',
  excelXmlExport: 'فایل با فرمت XML',
  pivots: 'برچسب ستون ها'
}

const frameworkComponents = {
  buttonRenderer: ButtonRendererComponent,
  agColumnHeader: HeaderRendererComponent,
  floatfilter: FloatFilterRendererComponent,
  checkboxComponent: CheckboxRendererComponent,
  cellRenderer: CellRendererComponent,
}
