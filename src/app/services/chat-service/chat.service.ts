import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl : string = 'http://localhost:3000/'
  constructor(private http :HttpClient) { }

  getAPi(url :string):Observable<any>{
    const uri = this.apiUrl + url
    return this.http.get(uri , {withCredentials : true})
  }
  postApi(payload :any , url:string):Observable<any>{
    const uri = this.apiUrl + url
    return this.http.post(uri,payload , {withCredentials : true})
  }
}
