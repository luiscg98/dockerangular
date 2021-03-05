import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const URLDEV = 'https://nekonokokoroapi.herokuapp.com/';
const URLDEV = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ApinodejsService {

  constructor(private http:HttpClient) {}

  getData(termino:string, menu:number, body:Object, token?:string) {
    let url=`${URLDEV}${termino}`
    switch(menu){
      case 0:
        return this.http.get(url);
      case 1:
        return this.http.post(url,body);
      case 2:
        return this.http.put(url,body);
      case 3:
        return this.http.delete(url);
      case 4:
        console.log(body);
        return this.http.post(url,body);
    }
  }

  upload(termino,body:FormData){
    let url=`${URLDEV}${termino}`;
    return this.http.post(url,body);
  }
}
