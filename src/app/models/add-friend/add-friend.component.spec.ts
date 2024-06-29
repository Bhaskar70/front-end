import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddFriendComponent } from './add-friend.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatService } from '../../services/chat-service/chat.service';

describe('AddFriendComponent', () => {
  let component: AddFriendComponent;
  let fixture: ComponentFixture<AddFriendComponent>;
  let httpTestingController: HttpTestingController;
  let dialogRefMock = {
    close: jasmine.createSpy('close')
  };
  const mockUsers = [
    { _id: '66444a00a3c7c36d3fb4e66c', email: 'bhaskar@gmail.com', name: 'mahesh' },
    { _id: 'ddfgd', email: 'hsfsdf@hfj.sdk', name: 'bhaskar' },
    { _id: 'ddfgd', email: 'hsfsdf@hfj.sdk', name: 'sandeep' }
  ]
  const mockResponse = {
    id: "66444a00a3c7c36d3fb4e66c",
    friends: [
      {
        name: "Bhaskar",
        email: "bhaskar@gmail.com",
        isFriend: "true",
        chatId: "663319ca1283a413e77e6f6866444a00a3c7c36d3fb4e66c"
      },
    
    ]
  }
  let chatService: ChatService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFriendComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        FormsModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            userData: {
              _id: '66444a00a3c7c36d3fb4e66c'
            }
          }
        },
        { provide: MatDialogRef, useValue: dialogRefMock },
        ChatService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddFriendComponent);
    component = fixture.componentInstance;
    chatService = TestBed.inject(ChatService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    
    // get all user data
    const req = httpTestingController.expectOne('http://localhost:3000/getAllUser');
    expect(req.request.method).toEqual('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(mockUsers);
    expect(component.users).toEqual(mockUsers);
    // get friends list
    const req2 = httpTestingController.expectOne('http://localhost:3000/get-friends')
    expect(req2.request.method).toEqual('POST');
    expect(req2.request.withCredentials).toBeTrue();
    expect(req2.request.body).toEqual({ id: '66444a00a3c7c36d3fb4e66c' });
    req2.flush(mockResponse);
    expect(component.friendsList).toBe(mockResponse.friends)
    expect(component.friendsData).toBe(component.friendsList)
    expect(component.friendIds).toEqual(component.friendsList.map((res)=>res.email))

    expect(component).toBeTruthy();
    httpTestingController.verify();
  });
 
  it('should call search',()=>{
    component.searchText = 'mahesh'
    component.users = mockUsers
    component.friendsList = mockResponse.friends
    component.friendIds = component.friendsList.map((res)=>res.email)
    component.Search()
  })
  it('should call search',()=>{
    component.searchText = 'mahesh'
    component.users = mockUsers
    component.friendsList = mockResponse.friends
    component.friendIds = []
    component.Search()
  })
  it('should call search',()=>{
    component.searchText = ''
    component.Search()
  })
  it('should call search',()=>{
    component.searchText = ''
    component.addFriend(mockUsers[1])
    // { _id: 'ddfgd', email: 'hsfsdf@hfj.sdk', name: 'bhaskar' },
    const payload = {
      userId: '66444a00a3c7c36d3fb4e66c',
      friendId: 'ddfgd',
      friendName: 'bhaskar',
      friendEmail: 'hsfsdf@hfj.sdk'
    }
    const req2 = httpTestingController.expectOne('http://localhost:3000/addFriend')
    expect(req2.request.method).toEqual('POST');
    expect(req2.request.withCredentials).toBeTrue();
    expect(req2.request.body).toEqual(payload);
    req2.flush(mockResponse);
  })
});
