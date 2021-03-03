import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UsuarioComponent } from './usuario.component';
import { HomeComponent } from './home/home.component';
import { ProductosModule } from './productos/productos.module';


const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'productos', loadChildren: () => import('./productos/productos.module').then(module => module.ProductosModule)},
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
export class UsuarioRouterModule { }
