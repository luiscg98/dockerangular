import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRouterModule } from './productos.routes';
import { MangaComponent } from './manga/manga.component';
import { MusicaComponent } from './musica/musica.component';
import { RopaComponent } from './ropa/ropa.component';
import { BlingComponent } from './bling/bling.component';
import { AnimeComponent } from './anime/anime.component';



@NgModule({
  declarations: [ProductosComponent, AnimeComponent, MangaComponent, MusicaComponent, RopaComponent, BlingComponent],
  imports: [
    CommonModule,
    ProductosRouterModule
  ]
})
export class ProductosModule { }
