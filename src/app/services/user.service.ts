import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForm, UserInfo } from '../interfaces/User';
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from 'src/environments/environments';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json ' }),
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public logged = new BehaviorSubject<boolean>( false )

  constructor(private http: HttpClient) { }

  postUser(user: UserForm): Observable<UserInfo>{
    const url = `${environment.BASE_URL}/users`
    return this.http.post<UserInfo>(url, user, httpOptions)
  }

  saveSession(user: UserInfo){
    const userString = JSON.stringify(user)
    sessionStorage.setItem('user', userString)
  }

  getSession(): UserInfo | undefined{
    const user = sessionStorage.getItem('user')
    if(!user){
      return undefined
    }else{
      return JSON.parse(user)
    }
  }

  isLogged(): boolean{
    const user = sessionStorage.getItem('user')
    if(!user){
      return false
    }else{
      return true
    }
  }

  clearSession(): void{
    sessionStorage.clear()
  }

  userRegister(email: string){
    let users: UserInfo[]
    let user: any
    this.getAllUsers().subscribe({
      next: (_users) =>{
        user = _users.filter(user => {
          return user.email === email
        })
      }
    })
  }

  getAllUsers(): Observable<UserInfo[]>{
    const url = `${environment.BASE_URL}/users`
    return this.http.get<UserInfo[]>(url)
  }

  getStatus(): Observable<boolean>{
    return this.logged
  }


}
