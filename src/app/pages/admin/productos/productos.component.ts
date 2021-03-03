import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApinodejsService } from '../../../services/apinodejs.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosV=[];
  productosF=[];
  productosIF=[];
  token;
  refreshToken;
  user;
  productos;
  constructor(private dataservice:DataService, private router:Router, private apinodejs: ApinodejsService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('jwt');
    this.refreshToken=localStorage.getItem('refreshToken');
    this.user=localStorage.getItem('user');
    if(this.token != null && this.refreshToken != null && this.user!= null){
      let u = jwt_decode(this.token);
      if(u['iss']!='ADMIN_ROLE'){
        this.router.navigate(['page/home']);
      }
      else{
        this.apinodejs.getData('product',0,null).subscribe(data=>{
          if(data['ok']==true){
            this.productos=data['productos'];
            let j = 0;
            let k=0;
            let u = 0;
            console.log(this.productos[0].disponible, this.productos.length);
            for(let i=0 ; i<this.productos.length; i++){
              if(this.productos[i].disponible == true){
                this.productosV[j]=this.productos[i];
                j++;
              }
              else{
                if(this.productos[i].img != 'no-image.jpg'){
                  this.productosF[k]=this.productos[i];
                  k++;
                }
                else{
                  this.productosIF[u]=this.productos[i];
                  u++;
                }
              }
            }
          }
        });
      }
    }
    else{
      this.router.navigate(['page/home']);
    }
  }

  baja(uid){
    console.log(uid);
    let body = {
      uid
    }
    this.apinodejs.getData(`product/delete/${uid}`,3,body).subscribe(data=>{
      if(data['ok']==true){
        alert(data['message']);
      }
      else{
        alert("Hubo un problema en el servidor, vuelve a intentarlo");
      }
      this.router.navigate(['../../admin/productos']);
    })
  }
  alta(uid, bandera){
    console.log(uid);
    let body = {
      uid
    }
    this.apinodejs.getData(`product/alta/${uid}`,2,body).subscribe(data=>{
      if(data['ok']==true && bandera==1){
        alert(data['message']);
      }
      if(data['ok']==true && bandera==0){

      }
      else{
        alert("Hubo un problema en el servidor, vuelve a intentarlo");
      }
      this.router.navigate(['../../admin/productos']);
    })
  }

  enviar(id){
    this.dataservice.sendCriterio3(id);
  }

  mandarId(id){
    this.dataservice.sendCriterio3(id);
    this.alta(id,0);
  }


}
