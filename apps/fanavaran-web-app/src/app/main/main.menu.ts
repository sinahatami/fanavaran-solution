import { BaseInfoMenu } from "./pages/base-info/base-info.menu"
import { DashboardMenu } from "./pages/dashboard/dashboard.menu"

export class MainMenu {
    static menu: any[] = [].concat(DashboardMenu, BaseInfoMenu)
}
