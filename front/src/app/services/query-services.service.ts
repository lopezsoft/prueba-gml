import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpServerService} from "../utils";
import {CategoryContract} from "../contracts/category-contract";
import {LoadMaskService} from "../common/load-mask.service";
import {SettingContract} from "../contracts/setting-contract";

@Injectable({
  providedIn: 'root'
})
export class QueryServicesService {

  public category:CategoryContract [] = [];
  public country:any[] = [];
  public setting:SettingContract;
  public settings:SettingContract[] = [];
  constructor(
    public Http: HttpServerService,
    public mask: LoadMaskService
  ) {

  }

  loadData() {
    this.mask.showBlockUI();

    this.getSettingByTag().subscribe({
      next: (response) => {
        this.setting = response;
      },
      error: () => this.settings= []
    });
    this.getSettings().subscribe({
      next: (response) => {
        this.settings = response;
      },
      error: () => this.settings= []
    });
    this.getCategories().subscribe({
      next: (data) => {
        this.mask.hideBlockUI();
        if(this.country.length === 0) {
          this.mask.showBlockUI();
        }
        this.category = data;
      },
      error: Error => {
        this.category = [];
        this.mask.hideBlockUI();
      }
    });

    this.getCountries().subscribe({
      next: (data) => {
        this.mask.hideBlockUI();
        this.country = data;
      },
      error: Error => {
        this.country = [];
        this.mask.hideBlockUI();
      }
    });
  }
  getSettingByTag(tag: string = 'E001'): Observable<SettingContract> {
    return this.Http.get(`/setting/${tag}`)
      .pipe(map((response: any) => {
        return response.setting;
      }));
  }
  getSettings(): Observable<SettingContract[]> {
    return this.Http.get('/setting')
      .pipe(map((response) => {
        return response.dataRecords.data;
      }));
  }
  getCategories(): Observable<any[]> {
    return this.Http.get('/category')
      .pipe(map((response: any) => {
        return response.records;
      }));
  }

  getCountries(region: string = 'ame'): Observable<any[]> {
    return this.Http.get(`/countries/region/${region}`)
      .pipe(map((response: any) => {
        return response.records;
      }));
  }
}
