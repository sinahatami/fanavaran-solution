//import { LoaderService } from '../../common/loader/loader.service';
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs-compat'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { map, throwError } from 'rxjs'

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router,/*  private loaderService: LoaderService ,*/ private authService: AuthService, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isTokenExpired: boolean = false

    if ((request.url.includes('NewViewStimul') && this.router.url.includes('dashboard')) || (request.url.includes('/Salary/CalcSalary') && request.method == 'POST') || (request.url.includes('GetAppInfo'))) null
    else {
      /* this.loaderService.show()
      this.loaderService.loaderCount++ */
    }

    const token: string = this.authService.token
    if (request.url.lastIndexOf('/Users/GetAppInfo' + 1) == -1 && token) {
      request = request.clone({ setHeaders: { authorization: token, 'Content-Type': 'application/json-patch+json' } })
      isTokenExpired = this.authService.isTokenExpired()
    }

    if (token && isTokenExpired && !this.authService.canCallRefreshService) this.authService.wantToRefresh = true


    if (token && isTokenExpired && this.authService.wantToRefresh) {
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
    }

    return next.handle(request).timeout(1800000).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const IsSuccess: boolean = event?.body?.IsSuccess
        IsSuccess && event.body.Message && (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE') && (request.url.search('Users/token') == -1 && request.url.search('Users/Token/Refresh') == -1 && request.url.search('GetSelect') == -1)
          ? this.toastr.success(event.body.Message.split(' |').join(','), 'موفق') : null
        this.setSpinnerAfterRes()
        if (!IsSuccess) return throwError(this.toastr.error(event.body.Message, 'خطا'))
      }
      return event
    })
    ).catch(error => this.handleError(error))
  }

  handleError(err: HttpErrorResponse): Observable<any> {
    err.status === 500 || err.status === 400 ? err.error.Message ? this.toastr.error(err.error.Message, 'خطا') : null : null
    this.setSpinnerAfterRes()
    return throwError(err)
  }

  setSpinnerAfterRes() {
    /* this.loaderService.loaderCount--
    if (this.loaderService.loaderCount <= 0) {
      this.loaderService.loaderCount = 0
      this.loaderService.hide()
    } */
  }

}
