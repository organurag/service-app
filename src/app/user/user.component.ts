import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  @ViewChild('userForm') userForm: NgForm;

  user1: User | any = new User();
  message;
  isEdit = false;

  users: User[] | any= [];

  constructor(private UserService : UsersService, private router : Router){}

  ngOnInit(): void {
    this.getUsers();
  }

 



  onCreate(){
    this.router.navigate(['useredit'])
  }

  sendUser(){

   console.log(this.userForm);
    this.user1.id = this.userForm.value.Id;
    this.user1.name = this.userForm.value.name;
    this.user1.email = this.userForm.value.email;
    this.userForm.reset();

    this.UserService.sendUser(this.user1).subscribe(data => {
      this.message = data;
      this.getUsers();
    })
    
  }

  getUsers(){
    this.UserService.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }

  onEdit(id: number){
    this.router.navigate(['/useredit/',id]);   
  }

  

  onDelete(id:number, name: string){
    confirm('Do you want to delete user with name:'+ name );
    this.UserService.deleteUser(id).subscribe(data => {
      this.message = data;
      this.getUsers();});
      
  }
}
