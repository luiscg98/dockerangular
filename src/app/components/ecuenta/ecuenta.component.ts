import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DataService } from '../../services/data.service';
import { ApinetcoreService } from '../../services/apinetcore.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApinodejsService } from '../../services/apinodejs.service';

@Component({
  selector: 'app-ecuenta',
  templateUrl: './ecuenta.component.html',
  styleUrls: ['./ecuenta.component.css']
})
export class EcuentaComponent implements OnInit {

  token;
  refreshToken;
  user;
  subscription2$: Subscription;
  subscription$: Subscription;
  constructor(private dataservice: DataService, private apinodejs:ApinodejsService, private router:Router) { }

  ngOnInit(): void {
  }

  guardar(telefono,direccion,cp){
    this.user = localStorage.getItem('user');
    this.token = localStorage.getItem('jwt');
    let body = {
      telefono,
      direccion,
      cp,
      id:this.user
    }
    this.apinodejs.getData(`user/edit`,2,body).subscribe(data=>{
      alert(data['message']);
      this.dataservice.sendCriterio(this.token);
    })
  }

  revisarToken(){
    this.token = localStorage.getItem('jwt');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.user = localStorage.getItem('user');
  }

}
