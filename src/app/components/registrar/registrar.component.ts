import { Component, OnInit } from '@angular/core';
import { ApinetcoreService } from '../../services/apinetcore.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private apinetcore: ApinetcoreService) { }

  ngOnInit(): void {
  }

  registro(Username, email, password){
    let body = {
      Username,
      email,
      password
    }
    this.apinetcore.getData('user', 1, body).subscribe(data=>{
      if(data['ok']==true){
        alert(data['message']);
      }
      else{
        alert("email ya utilizado");
      }
    });
  }
}
