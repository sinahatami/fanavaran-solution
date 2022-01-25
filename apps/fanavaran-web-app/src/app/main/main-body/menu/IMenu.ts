export interface IMenu {
  parentName: string
  menuItem: IMenuItem[]
}

export interface IMenuItem {
  id: number
  name: string
  farsiName: string
  path: string
  child: IMenuItem[]
}