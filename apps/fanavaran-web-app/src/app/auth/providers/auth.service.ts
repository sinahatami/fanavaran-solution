import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'apps/fanavaran-web-app/src/environments/environment'
//import { LocalStorageClass } from 'src/app/common/scripts/localStorage'
//import { environment } from 'src/environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'appname': 'Bime', 'secret': 'aA@12345' }),
  observe: 'response' as 'response'
}

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  canCallRefreshService = false

  refreshToken(body: any) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: this.token,
    })
    headers = { headers: headers }
    this.wantToRefresh = false
    this.canCallRefreshService = true
    return this.http.post(`Users/Token/Refresh`, body, headers)
  }

  setAuthDataToLocalStorage(data: any) {
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

  getLogin() { return this.http.post(`api/Subsystems/Tools/EITAuthenticationBase/GetAppToken`, null, httpOptions) }

  loginPost(userpass, token) {
    headers.headers = new HttpHeaders({ 'appToken': token, 'username': userpass.username, 'password': userpass.password })
    //headers.headers.set('appToken', token)
    //headers.headers.set('username', userpass.username)
    //headers.headers.set('password', userpass.password)
    return this.http.post(`api/Subsystems/Tools/EITAuthenticationBase/Login`, null, headers)
  }

  getAppInfo() { return this.http.get(`Users/GetAppInfo`) }

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
    this.router.navigateByUrl('main/dashboard')
  }

  removeLocalStorage() {
    //this.localStorageClass.removeItems(['Token', 'FullName', 'Token', 'Photo', 'ID'])

    //this.tabService.tabs = []
    //this.tabService.tabOptions = []
  }

  // addLocalStorage(items) { this.localStorageClass.setItems(items) }

  constructor(private http: HttpClient, private router: Router/* , private tabService: TabService */) { }
}
