import { Component } from '@angular/core';
import {QueryServicesService} from "./services/query-services.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public queryService: QueryServicesService
  ) {
    this.queryService.loadData();
  }
}
