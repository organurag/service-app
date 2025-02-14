import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../Models/user.model';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { City } from '../../Models/city.model';
import { State } from '../../Models/state.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  
  @ViewChild('userForm') userForm: NgForm;

  user1: User | any = new User();
  message;
  isEdit = false;
  id;
  cities: City[] | any[];
  states: State[] | any[];
  SelectedOption;
   

  users: User[] | any= [];

  constructor(private UserService : UsersService,
    private route: ActivatedRoute,
    private router: Router
  ){}

 

  sendUser(){

   console.log(this.userForm);
   console.log(this.user1);
    this.user1.id = this.userForm.value.Id;
    this.user1.name = this.userForm.value.name;
    this.user1.email = this.userForm.value.email;
    this.user1.cityId = this.userForm.value.cityId;
    this.userForm.reset();

    this.UserService.sendUser(this.user1).subscribe(data => {
      this.message = data;
      console.log(data)
      this.router.navigate(['user']);
    })
    
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params ) => {
      this.id = +params['id'];
      this.isEdit = params['id'] != null;
    })

    this.UserService.getUserById(this.id).subscribe((user: User) => {
      
      this.userForm.setValue ({        
          "Id": user.Id,
          "name": user.Name,
          "email": user.email,
          "state" : 1,
          "cityId": user.cityId       
      })
    })

    this.UserService.getStates().subscribe((states: State[])=> {
      this.states = states;
    })

  }

  UpdateUser(){
    this.user1.id = this.userForm.value.Id;
    this.user1.name = this.userForm.value.name;
    this.user1.email = this.userForm.value.email;
    this.user1.cityId = this.userForm.value.cityId;
    
    alert(this.user1.city);

    this.UserService.UpdateUser(this.user1.id, this.user1).subscribe(data => {
      this.message = data
      this.isEdit =false;
      this.router.navigate(['user']);  
    });
   
      
  }

  getCities(id: number){
    this.UserService.getCitiesById(this.SelectedOption).subscribe((cities: City[])=>{
      this.cities = cities;
      console.log(cities);
      console.log(this.SelectedOption);
    })
  }
  

}
