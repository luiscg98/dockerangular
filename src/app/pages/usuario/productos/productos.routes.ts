import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ProductosComponent } from './productos.component';
import { AnimeComponent } from './anime/anime.component';
import { MusicaComponent } from './musica/musica.component';
import { MangaComponent } from './manga/manga.component';
import { RopaComponent } from './ropa/ropa.component';
import { BlingComponent } from './bling/bling.component';


const routes: Routes = [
    {
        path: '',
        component: ProductosComponent,
        children: [
            { path: 'anime', component: AnimeComponent },
            { path: 'bling', component: BlingComponent },
            { path: 'ropa', component: RopaComponent },
            { path: 'manga', component: MangaComponent },
            { path: 'musica', component: MusicaComponent },
            //{ path: 'pais-detail/:codigo', component: PaisDetailComponent },
            //{ path: 'buttons', component: BotonesComponent },
            //{ path: 'cards', component: TarjetasComponent },
            //{ path: 'busqueda', component: BusquedaComponent },
            //{ path: 'cancelacion', component: CancelacionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosRouterModule { }
