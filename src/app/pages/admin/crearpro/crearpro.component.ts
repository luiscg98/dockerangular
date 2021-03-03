import { Component, OnInit } from '@angular/core';
import { ApinodejsService } from '../../../services/apinodejs.service';

@Component({
  selector: 'app-crearpro',
  templateUrl: './crearpro.component.html',
  styleUrls: ['./crearpro.component.css']
})
export class CrearproComponent implements OnInit {

  defaultBindingsList = [
    { value: "5fd24f58b6bc733c10d53f21", label: 'ANIME' },
    { value: "5fd24f67b6bc733c10d53f22", label: 'MANGA' },
    { value: "5fd24f78b6bc733c10d53f23", label: 'BLING' },
    { value: "5fd24f90b6bc733c10d53f24", label: 'ROPA' },
    { value: "5fd25997c085735674a7478d", label: 'MUSICA' },
  ];
  selectedRegion=null;
  categoria;
  imagen;
  constructor(private apinodejs:ApinodejsService) { }

  ngOnInit(): void {
    this.selectedRegion=this.defaultBindingsList[0];
  }

  onChangeRegion() {
    if(this.selectedRegion == undefined){
      this.categoria = "5fd24f58b6bc733c10d53f21"
    }
    else{
      this.categoria=this.selectedRegion.value;
    }

  }

  guardar(nombre,descripcion,stocks,precioUni){
    console.log(nombre,descripcion,stocks,precioUni);
    let body = {
      nombre,
      descripcion,
      stocks,
      precioUni,
      categorias:this.categoria
    }
    this.apinodejs.getData('product/add',1,body).subscribe(data=>{
      if(data['ok']==true){
        alert(data['message']);
      }
      else{
        alert("Producto existente");
      }
    })
  }


}
