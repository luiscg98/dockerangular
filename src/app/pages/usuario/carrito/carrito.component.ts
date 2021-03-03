import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { ApinodejsService } from '../../../services/apinodejs.service';
import jwt_decode from 'jwt-decode';
import { LoginComponent } from '../../../components/login/login.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito;
  indexes=[];
  info;
  mostrar=[];
  flag;
  token;
  refreshToken;
  user;
  subscription$: Subscription;
  constructor(private dataservice: DataService, private apinodejs: ApinodejsService) { }

  ngOnInit(): void {
    this.flag=0;
    console.log("entro carrito")
    this.revisarToken();
    if(this.token != null && this.refreshToken != null && this.user != null){
      let body = {
        usuario:this.user
      }
      this.apinodejs.getData('car/byId',1,body).subscribe(data => {
        console.log(data);
        if(data['ok'] == true && data['productos'] != null){
          this.carrito=data['productos']._id;
          this.info=data['productos'].productos;
          this.flag=1;
          console.log(this.info);
          let j=0;
          for (let i = 0; i < this.info.length; i++) {
            if(this.info[i]!=null){
              this.mostrar[j]=this.info[i];
              this.indexes[j]=i;
              j++;
            }
          }
          if(this.mostrar.length==0){
            this.flag=0;
          }else{
            for (let i = 0; i < this.mostrar.length; i++) {
              this.apinodejs.getData(`product/byId/${this.mostrar[i]}`,0,null).subscribe(data=>{
                this.mostrar[i]=(data['productos']);
              });
            }
          }
        }
        else{
          this.flag=0;
        }
      })
    }
    else{
      this.flag=0;
      this.subscription$ = this.dataservice.onListenCriterio2().subscribe(data=>{
        if(data != 'nulo'){
          let body = {
            usuario:data
          }
          this.apinodejs.getData('car/byId',1,body).subscribe(data => {
            console.log(data);
            if(data['ok'] == true && data['productos'] != null){
              this.carrito=data['productos']._id;
              this.info=data['productos'].productos;
              this.flag=1;
              console.log(this.info);
              let j=0;
              for (let i = 0; i < this.info.length; i++) {
                if(this.info[i]!=null){
                  this.mostrar[j]=this.info[i];
                  this.indexes[j]=i;
                  j++;
                }
              }
              if(this.mostrar.length==0){
                this.flag=0;
              }else{
                for (let i = 0; i < this.mostrar.length; i++) {
                  this.apinodejs.getData(`product/byId/${this.mostrar[i]}`,0,null).subscribe(data=>{
                    this.mostrar[i]=(data['productos']);
                  });
                }
              }
            }
            else{
              this.flag=0;
            }
          })
        }
      })
    }
  }

  borrarPro(producto){
    console.log("entro");
    let body = {
      cid:this.carrito,
      producto
    }
    this.apinodejs.getData('car/delete',4,body).subscribe(data=>{
      console.log(data);
      if(data['ok']==true){
        alert(data['message']);
      }
    })
  }

  buy(){
    console.log(this.mostrar);
    this.user = localStorage.getItem('user');
    let total=0;
    for(let i=0; i<this.mostrar.length; i++){
      total=total+Number(this.mostrar[i].precioUni);
    }
    console.log(total);

        let body = {
          producto:this.carrito,
          total,
          usuario:this.user,
          accion:1
        }
        this.apinodejs.getData('order/add',1,body).subscribe(data=>{
          if(data['ok']==true){
            this.revisarToken();
            let body = {
              cid:this.carrito,
              usuario:this.user
            }
            this.apinodejs.getData('car/borrarCarrito',2,body).subscribe(data=>{
              console.log(data);
              if(data['ok']==true){
                alert("Tu orden se ha generado exitosamente");
                this.dataservice.sendCriterio2(this.user);
                this.flag=0;
              }
            })
          }
        })
  }

  del(){
    console.log("entro");
    this.revisarToken();
    let body = {
      cid:this.carrito,
      usuario:this.user
    }
    this.apinodejs.getData('car/borrarCarrito',2,body).subscribe(data=>{
      console.log(data);
      if(data['ok']==true){
        alert(data['message']);
        this.dataservice.sendCriterio2(this.user);
        this.flag=0;
      }
    })
  }

  revisarToken(){
    this.token = localStorage.getItem('jwt');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.user = localStorage.getItem('user');
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
