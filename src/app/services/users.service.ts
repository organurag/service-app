import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  sendUser(user: User){
    return this.http.post('http://localhost:57195/api/User', user);
  }

  getAllUsers(){
    return this.http.get('http://localhost:57195/api/User').pipe(catchError(error => {
      console.log(error);
      return throwError (() => new Error(error.message));
    }));
  }

  getUserById(id: number){
    return this.http.get('http://localhost:57195/api/User/'+id).pipe(catchError(error => {
      console.log(error);
      return throwError (() => new Error(error.message));
    }));
  }

  UpdateUser(id:number, user: User){
    console.log(user)
    return this.http.put('http://localhost:57195/api/User/'+id, user);
  }

  deleteUser(id: number){
    return this.http.delete('http://localhost:57195/del?id='+id)
  }

  getStates(){
    return this.http.get('http://localhost:57195/api/State').pipe(catchError(error => {
      console.log(error);
      return throwError (() => new Error(error.message));
    }));
  }

  getCitiesById(id: number){
    return this.http.get('http://localhost:57195/api/City/'+id).pipe(catchError(error => {
      console.log(error);
      return throwError (() => new Error(error.message));
    }));
  }

  getAllCities(){
    return this.http.get('http://localhost:57195/api/City').pipe(catchError(error => {
      console.log(error);
      return throwError (() => new Error(error.message));
    }));
  }
}
