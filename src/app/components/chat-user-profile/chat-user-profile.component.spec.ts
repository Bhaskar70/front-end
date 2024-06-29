import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserProfileComponent } from './chat-user-profile.component';
import { HttpClientModule } from '@angular/common/http';

describe('ChatUserProfileComponent', () => {
  let component: ChatUserProfileComponent;
  let fixture: ComponentFixture<ChatUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatUserProfileComponent],
      imports :[
        HttpClientModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should logout', () => {
    component.LogOut()
  });
  it('should logout', () => {
    component.deleteAccount()
  });
});
