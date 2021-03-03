import { Component, OnInit } from '@angular/core';
import { faHeart, faMobileAlt, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ApinodejsService } from '../../../services/apinodejs.service';
import { DataService } from '../../../services/data.service';
import jwt_decode from 'jwt-decode'
import { Subscription } from 'rxjs';
import { ApinetcoreService } from '../../../services/apinetcore.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  faHeart=faHeart;
  faMobileAlt=faMobileAlt;
  faSearch=faSearch;
  faShoppingCart=faShoppingCart;
  faUser=faUser;
  categorias;
  rol="";
  token;
  refreshToken;
  user;
  subscription$: Subscription;
  constructor(private apinodejs:ApinodejsService, private dataservice:DataService, private apinetcore:ApinetcoreService) {
    this.apinodejs.getData('category',0,null).subscribe(data=>{
      this.categorias=data['categorias'];
    });
  }

  ngOnInit(): void {
    this.rol="";
    this.revisarToken();
    if(this.token != null && this.refreshToken != null && this.user != null){
      let role = jwt_decode(this.token);
      this.rol = role['iss'];
    }
    else{
      this.subscription$ = this.dataservice.onListenCriterio().subscribe(data=>{
        if(data!='nulo'){
          let role = jwt_decode(data);
          this.rol = role['iss'];
        }
        else{
          this.rol = data;
        }
      })
    }
  }

  mandarobs(idcat){
    this.dataservice.sendCriterio4(idcat);
  }

  revisarToken(){
    this.token = localStorage.getItem('jwt');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.user = localStorage.getItem('user');
  }



  refrescarTokens(){
    console.log("entro");
    this.revisarToken();
    if(this.token != null && this.refreshToken != null){
      let body = {
        AccessToken:this.token,
        refreshToken:this.refreshToken
      }
      this.apinetcore.getData('token/refresh',1,body).subscribe(data => {
        console.log(data);
        localStorage.setItem("jwt", data['accessToken']);
        localStorage.setItem("refreshToken", data['refreshToken']);
        console.log("se refresco");
      })
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}

