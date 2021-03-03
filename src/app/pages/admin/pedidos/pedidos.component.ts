import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ApinodejsService } from '../../../services/apinodejs.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  token;
  refreshToken;
  user;
  ordenes;
  constructor(private router: Router, private dataservice: DataService, private apinodejs: ApinodejsService) { }

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
        this.apinodejs.getData('order',0,null).subscribe(data=>{
          if(data['ok']==true){
            this.ordenes=data['ordenes'];
          }
        });
      }
    }
    else{
      this.router.navigate(['page/home']);
    }
  }

  mandarusu(id){
    this.dataservice.sendCriterio5(id);
  }

  mandarusu2(id){
    this.dataservice.sendCriterio6(id);
  }

}
