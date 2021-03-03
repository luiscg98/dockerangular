import { Component, OnInit } from '@angular/core';
import { ApinetcoreService } from 'src/app/services/apinetcore.service';
import { ApinodejsService } from '../../services/apinodejs.service';
import { DataService } from '../../services/data.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt" ;
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token;
  refreshToken;
  user;
  bandera=0;
  info;
  subscription$: Subscription;
  constructor(private apinetcore:ApinetcoreService, private dataservice: DataService, private router:Router, private jwtHelper:JwtHelperService) { }

  ngOnInit(): void {
    this.revisarToken();
    if(this.token != null && this.refreshToken != null && this.user != null){
      this.bandera=1;
      let usuario = jwt_decode(this.token);
      if(usuario['iss']=="ADMIN_ROLE"){
        this.router.navigate(['../../admin/productos']);
      }
      this.apinetcore.getData(`user/${usuario['aud']}`,3,null,this.token).subscribe(data=>{
        this.info=data;
      });
    }
    else{
      this.subscription$ = this.dataservice.onListenCriterio().subscribe( data => {
        console.log(data);
        if(data != 'nulo'){
          this.bandera=1;
          let usuario = jwt_decode(data);
          this.token=data;
          this.apinetcore.getData(`user/${usuario['aud']}`,3,null,this.token).subscribe(data=>{
            this.info=data;
          });
        }
      })
    }
  }

  login(email, password){
    let body = {
      email,
      password
    }
    this.apinetcore.getData('login',1,body).subscribe(data=>{
      if(data['ok'] == true){
        localStorage.setItem('jwt',data['accesToken']);
        localStorage.setItem('refreshToken',data['refreshToken']);
        localStorage.setItem('user',data['id']);
        this.bandera=1;
        this.token=data['accesToken'];
        this.refreshToken=data['refreshToken'];
        this.user=data['id'];
        this.dataservice.sendCriterio(data['accesToken']);
        this.dataservice.sendCriterio2(data['id']);
        alert("Kon'nichiwa");
        let usu=jwt_decode(this.token);
        if(usu['iss']=='ADMIN_ROLE'){
          this.router.navigate(['../../admin/productos']);
        }
      }
      else{
        alert(data['message']);
      }
    });
  }

  logout(){
    console.log("entra");
    this.token=localStorage.getItem('jwt');
    this.refreshToken=localStorage.getItem('refreshToken');
    let body = {
      accessToken:this.token,
      refreshToken:this.refreshToken
    }
    this.apinetcore.getData('token/refresh',1,body).subscribe(data=>{
      console.log(data);
      let t = data['accessToken'];
      if(data['ok']==true){
        let criterio='nulo';
        this.dataservice.sendCriterio(criterio);
        this.apinetcore.getData('token/revoke',2,null,this.token).subscribe(data=>{
          if(data['ok']==true){
            let u = jwt_decode(t);
            if(u['iss']=='ADMIN_ROLE'){
              this.token=null;
              this.refreshToken=null;
              this.user=null;
              this.bandera=0;
              localStorage.removeItem('jwt');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              this.router.navigate(['../../page/home']);
            }
            else{
              this.token=null;
              this.refreshToken=null;
              this.user=null;
              this.bandera=0;
              localStorage.removeItem('jwt');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              this.router.navigate(['../../page/home']);
            }
          }
        });
      }
    })
  }

  revisarToken(){
    this.token = localStorage.getItem('jwt');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.user = localStorage.getItem('user');
  }

}
