import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from './admin.component';
import { ProductosComponent } from './productos/productos.component';
import { PedidosComponent } from './pedidos/pedidos.component';



const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'productos', component: ProductosComponent },
            { path: 'pedidos', component: PedidosComponent},
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
export class AdministradorRouterModule { }
