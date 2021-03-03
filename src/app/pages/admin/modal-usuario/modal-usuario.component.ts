import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { ApinetcoreService } from '../../../services/apinetcore.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  info;
  usuario;
  subject5$:Subscription;
  constructor(private dataservice: DataService, private apinetcore: ApinetcoreService) { }

  ngOnInit(): void {
    this.subject5$ = this.dataservice.onListenCriterio5().subscribe(data=>{
      console.log(data);
      let token = localStorage.getItem('jwt');
      this.usuario=data;
      console.log(this.usuario)
      this.apinetcore.getData(`user/${this.usuario}`,5,null,token).subscribe(data=>{
        console.log(data);
        this.info=data;
      });
    })
  }

  ngOnDestroy() {
    this.subject5$.unsubscribe();
  }


}
