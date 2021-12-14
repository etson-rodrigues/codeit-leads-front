import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciamentoUsuariosComponent } from './gerenciamento-usuarios.component';

const routes: Routes = [{ path: '', component: GerenciamentoUsuariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoUsuariosRoutingModule { }
