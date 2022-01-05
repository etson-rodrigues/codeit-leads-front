import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaProcessosComponent } from './consulta-processos.component';

const routes: Routes = [{ path: '', component: ConsultaProcessosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaProcessosRoutingModule { }
