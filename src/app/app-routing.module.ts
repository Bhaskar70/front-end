import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatMainPageComponent } from './components/chat-main-page/chat-main-page.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
    path: '',
    component: LandingComponent,
    // canActivate : []

  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'hello', component: LandingComponent }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: ChatMainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
