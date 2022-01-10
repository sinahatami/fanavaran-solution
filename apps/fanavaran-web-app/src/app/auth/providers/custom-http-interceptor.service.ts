import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs-compat'
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'

import { LoaderService } from '../login/loader/loader.service'
import { AuthService } from './auth.service'

@Injectable({ providedIn: 'root' })
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private loaderService: LoaderService, private authService: AuthService, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isTokenExpired: boolean = false

    this.loaderService.show()
    this.loaderService.loaderCount++

    const token: string = this.authService.token
    if (!request.url.includes('GetAppToken') && !request.url.includes('sessionId') && token) {
      request = request.clone({ setHeaders: { authenticationToken: localStorage.getItem('token'), sessionId: localStorage.getItem('token'), 'Content-Type': 'application/json-patch+json' } })
      isTokenExpired = this.authService.isTokenExpired()
    }

    if (token && isTokenExpired && !this.authService.canCallRefreshService) this.authService.wantToRefresh = true


    /* if (token && isTokenExpired && this.authService.wantToRefresh) {
      let body = { Token: this.authService.token.replace('Bearer ', ''), Year_Fld: this.authService.year, Month_Fld: this.authService.month }
      this.authService.refreshToken(body).subscribe((res: any) => {
        if (res.Data) {
          this.authService.setAuthDataToLocalStorage(res.Data)
          this.authService.wantToRefresh = true
          this.authService.canCallRefreshService = true
          return
        }
      },
        _ => {
          this.authService.wantToRefresh = true
          this.authService.canCallRefreshService = true
          this.authService.logout()
        }
      )
      this.authService.wantToRefresh = true
      this.authService.canCallRefreshService = true
      this.authService.logout()
    } */

    return next.handle(request).timeout(1800000).pipe(map((event: HttpEvent<any>) => {
      /* if (event instanceof HttpResponse) {
        const IsSuccess: boolean = event?.body?.IsSuccess
        IsSuccess && event.body.Message && (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE') && (request.url.search('Users/token') == -1 && request.url.search('Users/Token/Refresh') == -1 && request.url.search('GetSelect') == -1)
          ? this.toastr.success(event.body.Message.split(' |').join(','), 'موفق') : null
        if (!IsSuccess) return Observable.throw(this.toastr.error(event.body.Message, 'خطا'))
      } */
      this.setSpinnerAfterRes()
      return event
    })
    ).catch(error => this.handleError(error))
  }

  handleError(err: HttpErrorResponse): Observable<any> {
    err.status === 500 || err.status === 400 ? err.error.Message ? this.toastr.error(err.error.Message, 'خطا') : null : null
    this.setSpinnerAfterRes()
    return Observable.throw(err)
  }

  setSpinnerAfterRes() {
    this.loaderService.loaderCount--
    if (this.loaderService.loaderCount <= 0) {
      this.loaderService.loaderCount = 0
      this.loaderService.hide()
    }
  }

}
