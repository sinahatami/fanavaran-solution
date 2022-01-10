import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    const token: string = this.authService.token

    if (!token) {
      this.authService.logout()
      return false
    }

    /*     if (this.authService.isTokenExpired()) {
          let body = { Token: this.authService.token.replace('Bearer ', ''), Year_Fld: this.authService.year, Month_Fld: this.authService.month }
          this.authService.refreshToken(body).subscribe((res: any) => {
            if (res.Valid) {
              this.authService.setAuthDataToLocalStorage(res.Data)
              this.authService.wantToRefresh = false
              return true
            }
          },
            _ => {
              this.authService.wantToRefresh = false
              this.authService.logout()
            }
          )
        } */

    return true
  }
}
