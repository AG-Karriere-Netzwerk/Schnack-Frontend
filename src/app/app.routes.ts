import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {SecuredComponent} from "./components/secured/secured.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'secured', component: SecuredComponent, canActivate: [authGuard]},
  {path: "**", component: HomeComponent}
];
