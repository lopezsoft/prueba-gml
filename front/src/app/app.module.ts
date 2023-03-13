import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExodolibsModule } from 'exodolibs';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { FormComponent } from './form.component';
import { GridComponent } from './grid.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BlockUIModule} from "ng-block-ui";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExodolibsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    BlockUIModule.forRoot({
      message: 'Procesando petición.'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
