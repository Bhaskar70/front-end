import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadApi, loadLoginApi } from './store/actions';
import { loadApiRes, loginData } from './store/seletctor';
import { io, Socket } from 'socket.io-client';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  url = 'http://localhost:3000/'
  socket: Socket;
  constructor(private router : Router){
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });
  }
  click(){
    this.socket.emit('message' , 'hello world')
  }
}
