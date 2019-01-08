import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { TsuUserComponent } from './components/tsu-user/tsu-user.component';
import { TsuCheckComponent } from './components/tsu-check/tsu-check.component';

import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },      
  { path: 'login', component: LoginComponent },      
  { path: 'user', component: TsuUserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: TsuUserComponent, canActivate: [AuthGuard] },
  { path: 'check', component: TsuCheckComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
