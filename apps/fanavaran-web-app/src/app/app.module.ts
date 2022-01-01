import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRouting,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //LoaderModule,
    ToastrModule.forRoot({
      disableTimeOut: true,
      // autoDismiss: false,
      positionClass: 'toast-top-center',
      closeButton: true,
      maxOpened: 1,
      autoDismiss: true
    }),
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
