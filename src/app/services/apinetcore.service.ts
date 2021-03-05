import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//const URLDEV = 'https://apicoremtwdmproyecto.azurewebsites.net/api/';
const URLDEV = 'http://192.168.1.65:500/api/';

@Injectable({
  providedIn: 'root'
})
export class ApinetcoreService {

  constructor(private http:HttpClient) { }

  getData(termino:string, menu:number, body:Object, token?:string) {
    let url=`${URLDEV}${termino}`;
    let headers = {
      Authorization: `Bearer ${token}`
    }
    switch(menu){
      case 0:
        return this.http.get(url);
      case 1:
        return this.http.post(url,body);
      case 2:
        return this.http.post(url,body, {headers});
      case 3:
        return this.http.get(url,{headers});
      case 4:
        return this.http.put(url,body,{headers});
      case 5:
        console.log(url);
        return this.http.get(url,{headers});
    }
  }
}
