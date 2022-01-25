import { IMenu } from "../../main-body/menu/IMenu"

export const BaseInfoMenu: IMenu[] = [
  {
    parentName: 'baseInfo',
    menuItem: [
      {
        id: 0,
        name: 'base-info',
        farsiName: 'اطلاعات پایه',
        path: '',
        child: [
          {
            id: 0,
            name: 'branch',
            farsiName: 'شعب و نمایندگی',
            path: '',
            child: []
          },
          {
            id: 0,
            name: 'general-base-info',
            farsiName: 'اطلاعات پایه عمومی',
            path: 'general-base-info',
            child: []
          }
        ]
      }
    ]
  }
]