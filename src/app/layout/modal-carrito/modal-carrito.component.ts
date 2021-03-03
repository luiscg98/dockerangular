import { Component, OnInit } from '@angular/core';
import { ApinodejsService } from '../../services/apinodejs.service';
import { DataService } from '../../services/data.service';
import  jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.css']
})
export class ModalCarritoComponent implements OnInit {

  flag=0;
  carrito;
  constructor(private dataService:DataService, private apiNodejs:ApinodejsService) { }

  ngOnInit(): void {

  }

}
