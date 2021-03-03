import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApinetcoreService } from '../../../services/apinetcore.service';
import { DataService } from '../../../services/data.service';
import { ApinodejsService } from '../../../services/apinodejs.service';

@Component({
  selector: 'app-modalpro',
  templateUrl: './modalpro.component.html',
  styleUrls: ['./modalpro.component.css']
})
export class ModalproComponent implements OnInit {

  info;
  nombre;
  img;
  subject6$:Subscription;
  constructor(private apinodejs : ApinodejsService, private dataservice: DataService) { }

  ngOnInit(): void {
    this.subject6$ = this.dataservice.onListenCriterio6().subscribe(data=>{
      console.log(data);
      this.apinodejs.getData(`product/byId/${data}`,0,null).subscribe(data=>{
        console.log(data);
        this.info=data['productos'];
        console.log(this.info);
        this.nombre=this.info.nombre;
        this.img=this.info.img;
      })
    })
  }

  ngOnDestroy() {
    this.subject6$.unsubscribe();
  }

}
