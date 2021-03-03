import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RecomendadosComponent } from './recomendados/recomendados.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ModalCarritoComponent } from './modal-carrito/modal-carrito.component';
import { CardsComponent } from './cards/cards.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardsComponent,
    CarouselComponent,
    CategoriasComponent,
    ModalCarritoComponent,
    RecomendadosComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CardsComponent,
    CarouselComponent,
    CategoriasComponent,
    ModalCarritoComponent,
    RecomendadosComponent
  ]
})
export class LayoutModule { }
