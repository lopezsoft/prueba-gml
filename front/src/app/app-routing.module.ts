import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from "./form.component";
import {GridComponent} from "./grid.component";

const routes: Routes = [
  {
    path: 'edit/:id',
    component: FormComponent
  },
  {
    path: 'create',
    component: FormComponent
  },
  {
    path: '',
    component: GridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
