import { UtilService } from './common/util/util.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptor } from './common/interceptor/http.interceptor';

export function httpServiceFactory(xhrBackend: XHRBackend,
  requestOptions: RequestOptions, utilService: UtilService) {
  return  new HttpInterceptor(xhrBackend, requestOptions, utilService);
}

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule,
    
  ],
  providers: [
    UtilService,
    {
      provide: Http,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, UtilService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
