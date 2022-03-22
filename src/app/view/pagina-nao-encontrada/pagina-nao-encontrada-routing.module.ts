import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

const routes: Routes = [{ path: '', component: PaginaNaoEncontradaComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaginaNaoEncontradaRoutingModule {}
