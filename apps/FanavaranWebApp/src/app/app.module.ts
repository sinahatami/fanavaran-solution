import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppRouting } from './app.routing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ToastrModule, ToastrService } from 'ngx-toastr'

import { AppComponent } from './app.component'
import { AuthGuardService } from './auth/providers/auth.guard'
import { AuthService } from './auth/providers/auth.service'
import { CustomHttpInterceptor } from './auth/providers/custom-http-interceptor.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouting,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      disableTimeOut: true,
      // autoDismiss: false,
      positionClass: 'toast-top-center',
      closeButton: true,
      maxOpened: 1,
      autoDismiss: true
    })
    //LoaderModule
  ],
  providers: [
    //  AuthGuardService,
    AuthService,
    ToastrService,
    //LoaderService     ,
    ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    //{ provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AuthService], multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
