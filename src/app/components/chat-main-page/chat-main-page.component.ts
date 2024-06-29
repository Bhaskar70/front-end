import { Component, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';
import { Friend, User } from '../../interface/user';


@Component({
  selector: 'app-chat-main-page',
  templateUrl: './chat-main-page.component.html',
  styleUrl: './chat-main-page.component.scss'
})
export class ChatMainPageComponent {
  userData!: User;
  selectedUser!: Friend;
  constructor(private chatservice: ChatService ) { }
  ngOnInit() {
    this.chatservice.getAPi('get-user').subscribe((res: User) => {
      this.userData = res
    })
  }
  selected(evt: Friend) {
    this.selectedUser = evt
  }
}
