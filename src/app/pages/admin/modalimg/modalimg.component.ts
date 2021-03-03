import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApinodejsService } from '../../../services/apinodejs.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-modalimg',
  templateUrl: './modalimg.component.html',
  styleUrls: ['./modalimg.component.css']
})
export class ModalimgComponent implements OnInit {

  private image:any;
  idCategoria;
  subject$:Subscription;
  constructor(private apinodejs: ApinodejsService, private dataservice: DataService) { }

  ngOnInit(): void {
    this.subject$ = this.dataservice.onListenCriterio3().subscribe(data=>{
      console.log(data);
      this.idCategoria=data;
    })
  }

  verArchivo(e){
    this.image = e.target.files[0];
  }

  guardarimg(){
    let formData = new FormData();
    formData.append("archivo", this.image);
    this.apinodejs.upload(`user/upload/productos/${this.idCategoria}`,formData).subscribe(data=>{
      if(data['ok']==true){
        alert(data['message']);
      }
    });
  }

  ngOnDestroy() {
    this.subject$.unsubscribe();
  }

}
