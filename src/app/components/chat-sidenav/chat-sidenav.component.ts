import { Component, EventEmitter, Inject, InjectionToken, Input, Output, ViewChild } from '@angular/core';
import { User, Friend, ContactList } from '../../interface/user';
import { AddFriendComponent } from '../../models/add-friend/add-friend.component';
import { ChatService } from '../../services/chat-service/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { WINDOW } from '../../app.module';

//export const WINDOW = new InjectionToken<Window>('Window');
@Component({
  selector: 'app-chat-sidenav',
  templateUrl: './chat-sidenav.component.html',
  styleUrl: './chat-sidenav.component.scss'
})
export class ChatSidenavComponent {
  dialogRef: any;
  @Input() userData!: User
  @Output() selected = new EventEmitter()
  contactList!: Friend[]
  constructor(private chatservice: ChatService, private dialog: MatDialog ,@Inject(WINDOW) private window: Window) { }
  ngOnInit() {
    this.chatservice.postApi({ id: this.userData._id }, 'get-friends').subscribe((res: ContactList) => {
      this.contactList = res?.friends
    })
  }
  openUserModel(name: any) {
    const index = this.contactList.findIndex((val: Friend) => val.name === name)
    this.contactList[index]['showModel'] = !this.contactList[index]['showModel']
  }
  openModal(): void {
    this.dialogRef = this.dialog.open(AddFriendComponent, {
      data: {
        userData: this.userData
      }
    });
  }
  selectUser(contact: Friend) {
    this.selected.emit(contact)
  }
  closeModal(): void {
    this.dialogRef.close();
  }
  navigateToDashboard() {
    this.redirect()
  }
  redirect(){
   this.window.location.href = 'http://localhost:4200/dashboard'
  }
  addStarToSpan(htmlString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const span = doc.querySelector('span[data-price]');
    if (span) {
      span.innerHTML += ' &#9733;';
    }
    return doc.body.innerHTML;
  }
}
