import { Routes } from '@angular/router';
import { NotaListComponent } from './nota-list.component';

export default [
    { path: '', component: NotaListComponent },
    { path: '**', redirectTo: '' }
] as Routes;
