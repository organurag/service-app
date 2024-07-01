import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../Models/user.model';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { City } from '../Models/city.model';

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

  cities: City[] | any = [];

  constructor(private UserService : UsersService, private router : Router){}

  ngOnInit(): void {
    this.getUsers();
    this.getCities();
  }

 



  onCreate(){
    this.router.navigate(['useredit'])
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
      this.getUsers();
      this.getCities();});
      
      
  }

  getCities(){
    this.UserService.getAllCities().subscribe(data=> {
      this.cities = data;
      this.mapCityNames();
    });
  }

  mapCityNames(){
    for(const user of this.users){
      const city = this.cities.find(c => c.CityId === user.cityId);
      if(city)
        {
          user.cityName = city.CityName
        }
        else 
        {
          user.cityName = 'unknown';
        }
    }
  }
}
