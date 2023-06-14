import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForm, UserInfo } from '../interfaces/User';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environments';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json ' }),
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postUser(user: UserForm): Observable<UserInfo>{
    const url = `${environment.BASE_URL}/users`
    return this.http.post<UserInfo>(url, user, httpOptions)
  }

  saveSession(user: any){
    const userString = JSON.stringify(user)
    sessionStorage.setItem('user', userString)
  }

  getSession(): any{
    const user = sessionStorage.getItem('user')
    if(!user){
      return undefined
    }else{
      return JSON.parse(user)
    }
  }

  clearSession(): void{
    sessionStorage.clear()
  }
}
