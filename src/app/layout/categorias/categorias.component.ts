import { Component, OnInit } from '@angular/core';
import { ApinodejsService } from '../../services/apinodejs.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias;
  constructor(private apiNodejs:ApinodejsService, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
    this.apiNodejs.getQuery(null,'category',1).subscribe((data) => {
      this.categorias=data['categorias'];
    })
  }

  ver(id:string){
    alert(id);
    this.dUrl();
  }

  dUrl(){
    this.router.navigate(['page/productos']);
  }


}
