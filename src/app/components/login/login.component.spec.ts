import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import {  RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let chatService: ChatService;
  let router: Router;
  let mockResponse = { _id: '66444a00a3c7c36d3fb4e66c' , name :'mahesh' , email : 'fgdfgdgd@ghf.com'}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports :[
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers:[ChatService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    chatService = TestBed.inject(ChatService)
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call login' , ()=>{
  spyOn(chatService, 'postApi').and.callFake(()=>{
    return of(mockResponse)
  });
  spyOn(router, 'navigate');
  component.email = 'test@example.com'
  component.password = 'password'
  component.Login()
  expect(chatService.postApi).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' }, 'login')
  expect(router.navigate).toHaveBeenCalledWith(['dashboard']);  
})
});
