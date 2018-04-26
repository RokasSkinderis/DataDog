import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DotaApiService {
  host: string;

  constructor(public http: HttpClient) {
    this.host = 'https://api.opendota.com/api';
  }

  searchUsers(searchValue): Observable<any> {
    return this.http.get(`${this.host}/search?q=${searchValue}`);
  }

  getUsers(accountId): Observable<any> {
    return this.http.get(`${this.host}/players/${accountId}`);
  }

  getUsersWL(accountId): Observable<any> {
    return this.http.get(`${this.host}/players/${accountId}/wl`);
  }

  getUsersMatches(accountId): Observable<any> {
    return this.http.get(`${this.host}/players/${accountId}/matches?limit=10`);
  }

  getHeroes(): Observable<any> {
    return this.http.get(`${this.host}/heroes`);
  }

}
