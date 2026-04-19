import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { UsuarioListComponent } from './app/modules/usuarios/components/usuario-list/usuario-list.component';
import { NotaListComponent } from './app/modules/nota/nota-list/nota-list.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'usuario1   ', component: UsuarioListComponent },
            { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'usuarios', loadChildren: () => import('./app/modules/usuarios/usuarios.routes') },
            { path: 'notas', component: NotaListComponent }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
