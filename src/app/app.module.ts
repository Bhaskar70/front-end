import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChatMainPageComponent } from './components/chat-main-page/chat-main-page.component';
import { ChatProfileNavComponent } from './components/chat-profile-nav/chat-profile-nav.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatSidenavComponent } from './components/chat-sidenav/chat-sidenav.component';
import { ChatUserProfileComponent } from './components/chat-user-profile/chat-user-profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatService } from './services/chat-service/chat.service';
import { AddFriendComponent } from './models/add-friend/add-friend.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from './store/reducer';
import { AppEffects } from './store/effects';
export const WINDOW = new InjectionToken<Window>('Window');
@NgModule({
  declarations: [
    AppComponent,
    ChatMainPageComponent,
    ChatProfileNavComponent,
    ChatRoomComponent,
    ChatSidenavComponent,
    ChatUserProfileComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    AddFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({data : AppReducer}),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [
    provideAnimationsAsync(),
    {provide : WINDOW , useValue : window},
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
