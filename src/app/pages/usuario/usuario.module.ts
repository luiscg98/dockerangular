import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioRouterModule } from './usuario.routes';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RecomendadosComponent } from './recomendados/recomendados.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopbarComponent } from './topbar/topbar.component';
import { CarritoComponent } from './carrito/carrito.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsuarioComponent,
    CarouselComponent,
    CategoriasComponent,
    RecomendadosComponent,
    BienvenidaComponent,
    TopbarComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuarioRouterModule,
    FontAwesomeModule,
  ]
})
export class UsuarioModule { }
