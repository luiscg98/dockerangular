import { Component, OnInit } from '@angular/core';
import { ApinodejsService } from '../../../../services/apinodejs.service';
import jwt_decode from 'jwt-decode';
import { DataService } from '../../../../services/data.service';
import { Subscription } from 'rxjs';
import { ApinetcoreService } from '../../../../services/apinetcore.service';
@Component({
  selector: 'app-ropa',
  templateUrl: './ropa.component.html',
  styles: [
  ]
})
export class RopaComponent implements OnInit {

  productos;
  bandera;
  token;
  refreshToken;
  user;
  botones=0;
  sesionactiva=0;
  subscription$:Subscription;
  subscription2$:Subscription;
  productos1=['hgfd','2','3','4','5','6','7','8','9','10','11','12','13','14',15,16,17,18,19,20,21,22,23,24,25]
  constructor(private apinodejs:ApinodejsService, private dataservice:DataService, private apinetcore: ApinetcoreService) {
  }

  ngOnInit(): void {
    this.apinodejs.getData('images/productos/5fd2794ef3be7b04407e9544-983.jpg',0,null).subscribe(data=>{
      console.log(data);
    })
    this.revisarToken();
    if(this.token != null ){
      this.botones=1;
    }
    else{
      this.subscription$ = this.dataservice.onListenCriterio().subscribe(data=>{
        if(data!='nulo'){
          this.botones=1;
        }
        else{
          this.botones=0;
        }
      })
    }
    let body = {
      categorias:"5fd24f90b6bc733c10d53f24"
    }
    this.apinodejs.getData('product/byCategory',1,body).subscribe(data=>{
      this.productos=data['productos'];
      if(this.productos.length > 0){
        this.bandera=1;
      }
      else{
        this.bandera=0;
      }
    })
  }

  buy(id,total){
    this.sesionactiva=0;
    this.revisarToken();
    if(this.token != null && this.refreshToken != null && this.user != null){
      let rol = jwt_decode(this.token);
      this.comunicacionApi(rol['iss'],id,this.user,total);
    }
    else{
      this.subscription$ = this.dataservice.onListenCriterio().subscribe(data => {
        if(data!='nulo'){
          let rol = jwt_decode(data);
          this.sesionactiva=1;
          this.subscription2$ = this.dataservice.onListenCriterio2().subscribe(data=>{
            if(data!='nulo'){
              this.comunicacionApi(rol['iss'],id,data,total);
            }
          })
        }
      });
      if(this.sesionactiva==0){
        alert("No has iniciado sesión");
      }
    }
  }

  carrito(producto){
    this.revisarToken();
    this.apinetcore.getData(`user/${this.user}`,3,null,this.token).subscribe(data=>{
      console.log(data);
      if(data['carritoflag']==true){
        let body = {
          cid:data['carrito'],
          producto
        }
        this.apinodejs.getData('car/edit',2,body).subscribe(data=>{
          if(data['ok']==true){
            alert(data['message']);
            this.dataservice.sendCriterio2(this.user);
          }
        })
      }
      else{
        console.log("entro");
        let body = {
          usuario:this.user,
          producto
        }
        this.apinodejs.getData('car/add',1,body).subscribe(data=>{
          if(data['ok']==true){
            alert(data['message']);
            this.dataservice.sendCriterio2(this.user);
          }
        })
      }
    })
  }

  revisarToken(){
    this.token = localStorage.getItem('jwt');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.user = localStorage.getItem('user');
  }

  comunicacionApi(rol, producto, usuario, total){
    if(rol=="ADMIN_ROLE"){
      alert("Eres usuario, no puedes hacer esta accion");
    }
    else{
      console.log(producto,usuario,total);
      let body = {
        producto,
        total,
        usuario,
        accion:0
      }
      this.apinodejs.getData('order/add',1,body).subscribe(data=>{
        if(data['ok']==true){
          alert(data['message']);
        }
      })
    }
  }


}
