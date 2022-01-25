import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MainMenu } from '../../main.menu'
import { IMenu, IMenuItem } from './IMenu'

@Component({
  selector: 'fanavaran-solution-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuList: IMenu[] = MainMenu.menu

  clickMenuItem(menuList: IMenuItem) {
    menuList.path ? this.router.navigateByUrl(menuList.path) : null
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

}
