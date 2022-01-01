import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'apps/fanavaran-web-app/src/environments/environment'
//import { LocalStorageClass } from 'src/app/common/scripts/localStorage'
//import { environment } from 'src/environments/environment'

@Injectable()
export class AuthService {
  year: any
  month: any

  canCallRefreshService = false

  refreshToken(body: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: this.token,
    })
    headers = { headers: headers }
    this.wantToRefresh = false
    this.canCallRefreshService = true
    return this.http.post(`${environment.API_URL}Users/Token/Refresh`, body, headers)
  }

  setAuthDataToLocalStorage(data: any) {
    this.year = data.LastYear
    this.month = data.LastMonth
    localStorage.setItem('Token', `Bearer ${data.access_token}`)
    localStorage.setItem('ExpireToken', JSON.stringify(new Date().valueOf() + data.expires_in * 1000))
    localStorage.setItem('OwnerPID', data.Pid)
    localStorage.setItem('OwnerUserId', data.UserID)
    localStorage.setItem('Year_Fld', data.LastYear)
    localStorage.setItem('Month_Fld', data.LastMonth)
    localStorage.setItem('HeaderMessage', data.HeaderMessage)
  }

  //  localStorageClass = new LocalStorageClass()
  wantToRefresh: boolean = false

  get token(): string { return localStorage.getItem('Token') }

  get expired(): number { return +JSON.parse(localStorage.ExpireToken) }

  isTokenExpired(): boolean { return this.expired < new Date().valueOf() }

  login(body) { return this.http.post(`${environment.API_URL}Users/token`, body) }

  getAppInfo() { return this.http.get(`${environment.API_URL}Users/GetAppInfo`) }

  logout() {
    //this.tabService.tabs = []
    //this.tabService.tabOptions = []
    localStorage.clear()
    this.routeToLogin()
  }

  routeToLogin() {
    this.router.navigateByUrl('/auth')
  }

  routeToDashboard() {
    this.router.navigateByUrl('/main/dashboard')
  }

  removeLocalStorage() {
    //this.localStorageClass.removeItems(['Token', 'FullName', 'Token', 'Photo', 'ID'])

    //this.tabService.tabs = []
    //this.tabService.tabOptions = []
  }

  // addLocalStorage(items) { this.localStorageClass.setItems(items) }

  private ConvertToLowerCase(data) {
    var key, keys = Object.keys(data)
    var n = keys.length
    var newobj = {}
    while (n--) {
      key = keys[n]
      newobj[key.toLowerCase()] = data[key]
    }
    return newobj
  }

  constructor(private http: HttpClient, private router: Router/* , private tabService: TabService */) { }
}
