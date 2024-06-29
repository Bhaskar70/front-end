import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSidenavComponent } from './chat-sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatMainPageComponent } from '../chat-main-page/chat-main-page.component';
import { WINDOW } from '../../app.module';
import { ChatService } from '../../services/chat-service/chat.service';

describe('ChatSidenavComponent', () => {
  let component: ChatSidenavComponent;
  let fixture: ComponentFixture<ChatSidenavComponent>;
  let chatService: ChatService;
  let dialogRefMock = {
    close: jasmine.createSpy('close')
  };
  let router: Router;
  const mockResponse = {
    id: "66444a00a3c7c36d3fb4e66c",
    friends: [
      {
        _id: 'fddfhdhdfh',
        name: "Bhaskar",
        email: "bhaskar@gmail.com",
        isFriend: true,
        chatId: "663319ca1283a413e77e6f6866444a00a3c7c36d3fb4e66c"
      },

    ]
  }
  let mockWindow: { location: { href: string } };
  beforeEach(async () => {
    mockWindow = {
      location: { href: '' }
    };
    await TestBed.configureTestingModule({
      declarations: [ChatSidenavComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'dashboard', component: ChatMainPageComponent }]),
      ],
      providers: [{ provide: WINDOW, useValue: mockWindow }]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ChatSidenavComponent);
    component = fixture.componentInstance;
    component.userData = { _id: '66444a00a3c7c36d3fb4e66c', name: 'mahesh', email: 'fgdfgdgd@ghf.com' }
    chatService = TestBed.inject(ChatService)
    component.dialogRef = dialogRefMock
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    spyOn(chatService, 'postApi').and.callFake(() => {
      return of(mockResponse)
    })
    component.ngOnInit()
    expect(chatService.postApi).toHaveBeenCalledWith({ id: '66444a00a3c7c36d3fb4e66c' }, 'get-friends')
    expect(component.contactList).toBe(mockResponse.friends)
  })
  it('should call openUserModel', () => {
    component.contactList = mockResponse.friends
    component.openUserModel('Bhaskar')
  })
  it('should call openModal', () => {
    component.openModal()
  })
  it('should call selectUser', () => {
    const mockdata = {
      _id: 'fddfhdhdfh',
      name: "Bhaskar",
      email: "bhaskar@gmail.com",
      isFriend: true,
      chatId: "663319ca1283a413e77e6f6866444a00a3c7c36d3fb4e66c"
    }
    component.selectUser(mockdata)
  })
  it('should call closemodel', () => {
    component.closeModal()
    expect(component.dialogRef).toBe(dialogRefMock)
  })
  // it('should navigate to dashboard',()=>{
  //   spyOnProperty(window.location, 'href').and.returnValue('http://localhost:4200/dashboard')
  //   component.redirect()
  // })
  it('should navigate to dashboard', () => {
    const navigateSpy = spyOn(component, 'redirect').and.callThrough();
    component.navigateToDashboard();
    expect(navigateSpy).toHaveBeenCalled();
    expect(mockWindow.location.href).toBe('http://localhost:4200/dashboard');
  });

  it('should call addStarToSpan',()=>{
    const content = `<p><span data-price>hello<span><span>hello21<span></p>`
    component.addStarToSpan(content)
  })
});
