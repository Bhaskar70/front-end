import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss'
})
export class AddFriendComponent {
  users: any;
  friendsList: any = [];
  searchText!: string;
  friendsData: any;
  friendIds: any=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddFriendComponent>,
    private chatService: ChatService,
  ) {
    this.chatService.getAPi('getAllUser').subscribe((users) => {
      this.users = users
    })
    this.chatService.postApi({ id: data.userData._id }, 'get-friends').subscribe((res: any) => {
      console.log(res, "123::::")
      this.friendsList = res?.friends
      this.friendsData = this.friendsList
      this.friendIds = res?.friends.map((res :any)=>res.email) 
    })
  }
  Search() {
    if (this.searchText) {
      console.log(this.friendIds , this.friendsList , "12e3")
      this.friendsData = this.users.filter((res: any) => {
        if(this.friendIds && this.friendIds.length){
          res['isFriend'] = this.friendIds.includes(res.email) ? true : false
        }else{
          res['isFriend'] = false
        }
        return res.name.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0 
      })
    }else{
      this.friendsData = this.friendsList
    }
  }
  addFriend(user: any) {
    const payload = {
      userId: this.data.userData._id,
      friendId: user._id,
      friendName: user.name,
      friendEmail: user.email
    }
    this.chatService.postApi(payload , 'addFriend').subscribe((res)=>{
      console.log(res, "add friend")
    })
  }
}
