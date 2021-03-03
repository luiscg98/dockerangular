import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRouterModule } from './admin.routes';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductosComponent } from './productos/productos.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ModalComponent } from './modal/modal.component';
import { CrearproComponent } from './crearpro/crearpro.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ModalimgComponent } from './modalimg/modalimg.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { ModalproComponent } from './modalpro/modalpro.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    ProductosComponent,
    TopbarComponent,
    PedidosComponent,
    ModalComponent,
    CrearproComponent,
    ModalimgComponent,
    ModalUsuarioComponent,
    ModalproComponent
  ],
  imports: [
    CommonModule,
    AdministradorRouterModule,
    NgSelectModule,
    FormsModule
  ],
  exports:[
    TopbarComponent
  ]
})
export class AdminModule { }
