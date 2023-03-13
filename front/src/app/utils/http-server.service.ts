import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';

import {JsonResponse} from '../contracts/json-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url    = environment.APIURL;
  }

  protected getHeaders(): HttpHeaders{
    return  new HttpHeaders({timeout: `${36000}`})
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true')
        .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  }

  delete(query: string, params: any = {}) {
    const me = this;
    return me.http.delete<JsonResponse>(`${ me.url }${ query }`, { headers : me.getHeaders(), params });
  }

  post(query: string, body: any = {}, token: boolean = false) {
    const me = this;
    return me.http.post<JsonResponse>(`${ me.url }${ query }`, body, { headers : me.getHeaders()});
  }

  put(query: string, body: any, token: boolean = false) {
    const me = this;
    return me.http.put<JsonResponse>(`${ me.url }${ query }`, body, { headers : me.getHeaders()});
  }

  get(query: string, exParams: any = {}) {
    const me = this;
    return me.http.get<JsonResponse>(`${me.url}${ query }`, { headers : me.getHeaders(), params: exParams });
  }

  getUrl(): string{
    return this.url;
  }


}

