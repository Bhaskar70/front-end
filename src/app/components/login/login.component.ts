import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string;
  password: string;
  constructor(private chatservice: ChatService, private router:Router) {

  }
  ngOnInit() {
    console.log(this.router.getCurrentNavigation()) 
  }
  Login() {
    if (this.email && this.password) {
      this.chatservice.postApi({ email: this.email, password: this.password } , 'login').subscribe((res)=>{
        this.router.navigate(['dashboard'])
      })
    }
  }
}
