import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { TsuUserComponent } from './components/tsu-user/tsu-user.component';
import { TsuCheckComponent } from './components/tsu-check/tsu-check.component';
import { HomeComponent } from './components/home/home.component';
import { TsuQrComponent } from './components/tsu-qr/tsu-qr.component';

import { TsuService } from './services/tsu.service';
import { LoginService } from './services/login.service';
import { ConfigService } from './services/config.service';
import { AuthGuard } from './services/auth.guard';



@NgModule({
  declarations: [    
    AppComponent,
    LoginComponent,        
    TsuUserComponent,
    TsuCheckComponent,    
    HomeComponent, 
    TsuQrComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,    
    NgbModule
  ],
  providers: [
    TsuService,
    LoginService,
    ConfigService,    
    AuthGuard
  ],
  entryComponents: [
    TsuQrComponent
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
