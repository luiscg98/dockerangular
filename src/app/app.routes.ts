import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    //{ path: 'home', component: HomeComponent },
    { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(module => module.AdminModule)},
    { path: 'page', loadChildren: () => import('./pages/usuario/usuario.module').then(module => module.UsuarioModule) },
    //{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(modules => modules.LoginModule) },
    { path: '', redirectTo: '/page/home', pathMatch: 'full' },
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRouterModule { }
