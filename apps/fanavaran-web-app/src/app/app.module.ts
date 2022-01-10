import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { ToastrModule } from 'ngx-toastr'

import { LoaderModule } from './auth/login/loader/loader.module'
import { AppComponent } from './app.component'
import { AppRouting } from './app.routing'
import { CustomHttpInterceptor } from './auth/providers/custom-http-interceptor.service'
//import { AuthGuardService } from './auth/providers/auth.guard'

const ToastrConfig = { disableTimeOut: true, positionClass: 'toast-top-center', closeButton: true, maxOpened: 1, autoDismiss: true, /* autoDismiss: false */ }

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoaderModule,
    ToastrModule.forRoot(ToastrConfig)],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
