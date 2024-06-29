import { Component, Input } from '@angular/core';
import { Friend } from '../../interface/user';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {
  @Input() selectUser!: Friend
}
