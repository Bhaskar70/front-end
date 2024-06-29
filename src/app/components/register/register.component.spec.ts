import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
 let formBuilder: FormBuilder;
 let chatservice : ChatService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports :[
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[ChatService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    chatservice =TestBed.inject(ChatService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call Register', ()=>{
    spyOn(chatservice , 'postApi').and.callFake(()=>{
      return of({} as any)
    })
    component.registerForm.get('password').setValue('12345')
    component.registerForm.get('name').setValue('gfdfgdfgdfg')
    component.registerForm.get('email').setValue('ghfg@hgff.hfgh')
    component.registerForm.get('confirmPassword').setValue('12345')
    component.Register()
    let payload = {
      name : 'gfdfgdfgdfg' ,
      email: 'ghfg@hgff.hfgh',
      password : '12345'
    }
   expect(chatservice.postApi).toHaveBeenCalledWith(payload,'register')
  })
  it('should not set error if passwordControl or confirmPasswordControl is null', () => {
    const formGroup: FormGroup = formBuilder.group({
     
    });
  
    component.passwordMatchValidator(formGroup);
  
  });
});
