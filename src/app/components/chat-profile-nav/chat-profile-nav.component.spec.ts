import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatProfileNavComponent } from './chat-profile-nav.component';
import { HttpClientModule } from '@angular/common/http';

describe('ChatProfileNavComponent', () => {
  let component: ChatProfileNavComponent;
  let fixture: ComponentFixture<ChatProfileNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatProfileNavComponent],
      imports :[
        HttpClientModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatProfileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call open notifications' , ()=>{
    component.openNotifications()
  })
});
