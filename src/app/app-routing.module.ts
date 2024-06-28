import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FkartComponent } from './fkart/fkart.component';
import { AzonComponent } from './azon/azon.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [
  {path: 'fkart', component: FkartComponent},
  {path: 'azon', component: AzonComponent},
  {path: 'user', component: UserComponent},
  {path: 'useredit', component: UserEditComponent},
  {path: 'useredit/:id', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
