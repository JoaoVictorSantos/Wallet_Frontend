import { UtilService } from './common/util/util.service';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptor } from './common/interceptor/http.interceptor';
import { AuthGuard } from './common/guard/auth-guard';
import { AuthGuardChild } from './common/guard/auth-guard-child';

export function httpServiceFactory(xhrBackend: XHRBackend,
  requestOptions: RequestOptions, utilService: UtilService) {
  return  new HttpInterceptor(xhrBackend, requestOptions, utilService);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    UtilService,
    {
      provide: Http,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, UtilService]
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    AuthGuard,
    AuthGuardChild
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
