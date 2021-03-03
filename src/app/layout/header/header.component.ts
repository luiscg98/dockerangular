import { Component, OnInit } from '@angular/core';
import { faHeart, faMobileAlt, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ApinodejsService } from '../../services/apinodejs.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { ApiNetcoreService } from '../../services/api-netcore.service';
import  jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faSearch = faSearch;
  faMobileAlt = faMobileAlt;
  faHeart = faHeart;
  categorias;
  role;
  token;
  usuario;
  refreshToken;

  constructor(private router:Router, private apiNodejs:ApinodejsService, private dataService:DataService, private apinetcore:ApiNetcoreService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('jwt');
    this.refreshToken=localStorage.getItem('refreshToken');
    this.usuario=localStorage.getItem('user');
    this.apiNodejs.getQuery(null,'category',1).subscribe((data) => {
      this.categorias=data['categorias'];
    })
    if(this.token != null && this.usuario != null){
      let u = jwt_decode(this.token);
      this.role=u['iss'];
      this.infoUsuario();
    }
  }

  buscar(criterio: string) {
    this.dataService.sendCriterio(criterio);
  }

  contenido(){
    this.token = localStorage.getItem('jwt');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.usuario = localStorage.getItem('user');
    if(this.token != null && this.refreshToken != null && this.usuario != null){
      this.infoUsuario();
    }
  }

  infoUsuario(){
    let body={};
    this.apinetcore.getQuery(body,`user/${this.usuario}`,3, this.token).subscribe(data => {
  });
  }


}
