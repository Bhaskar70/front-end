import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMainPageComponent } from './chat-main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';
import { AppModule } from '../../app.module';

describe('ChatMainPageComponent', () => {
  let component: ChatMainPageComponent;
  let fixture: ComponentFixture<ChatMainPageComponent>;
  let chatService : ChatService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatMainPageComponent],
      providers :[
        ChatService,
      ],
      imports :[
        HttpClientModule,
        AppModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatMainPageComponent);
    chatService = TestBed.inject(ChatService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call get-user api',()=>{
     spyOn(chatService , 'getAPi').and.callFake(()=>{
      return of(mockUser as any)
     })
     const mockUser = { _id: '66444a00a3c7c36d3fb4e66c' , name :'mahesh' , email : 'fgdfgdgd@ghf.com'}
     component.ngOnInit()
     expect(chatService.getAPi).toHaveBeenCalledWith('get-user')
     expect(component.userData).toBe(mockUser)
  })
  it('should call selected',()=>{
    const mockFriend = {
      _id :'fddfhdhdfh',
      name: "Bhaskar",
      email: "bhaskar@gmail.com",
      isFriend: true,
      chatId: "663319ca1283a413e77e6f6866444a00a3c7c36d3fb4e66c"
    }
    component.selected(mockFriend)
  })
});
