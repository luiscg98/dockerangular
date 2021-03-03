import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { JwtModule } from "@auth0/angular-jwt" ;
import { LoginComponent } from './components/login/login.component';
import { EcuentaComponent } from './components/ecuenta/ecuenta.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AdminModule } from './pages/admin/admin.module';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    EcuentaComponent,
    RegistrarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44338"],
        blacklistedRoutes: []
      }
    })
  ],
  exports:[
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
