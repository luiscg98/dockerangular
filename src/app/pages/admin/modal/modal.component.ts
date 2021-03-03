import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApinodejsService } from '../../../services/apinodejs.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  id
  subject$:Subscription;
  constructor(private apinodejs: ApinodejsService, private dataservice: DataService) { }

  ngOnInit(): void {
    this.subject$ = this.dataservice.onListenCriterio3().subscribe(data=>{
      console.log(data);
      this.id=data;
    })
  }

  editar(nombre, descripcion, categorias, precioUni, stocks){
    let body = {
      nombre,
      descripcion,
      categorias,
      precioUni,
      stocks,
      uid:this.id
    }
    this.apinodejs.getData('product/edit',2,body).subscribe(data=>{
      if(data['ok']==true){
        alert(data['message']);
      }
    })
  }

  ngOnDestroy() {
    this.subject$.unsubscribe();
  }

}
