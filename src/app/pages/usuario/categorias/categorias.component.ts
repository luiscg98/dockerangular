import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApinodejsService } from '../../../services/apinodejs.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias;
  constructor(private apinodejs:ApinodejsService, private router:Router) { }

  ngOnInit(): void {
    this.apinodejs.getData('category',0,null).subscribe((data) => {
      this.categorias=data['categorias'];
    })
  }

  ver(url:string){
    this.router.navigate([url]);
  }

}
