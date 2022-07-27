import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoConsultasAnaliticoComponent } from './historico-consultas-analitico.component';

const routes: Routes = [{ path: '', component: HistoricoConsultasAnaliticoComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoricoConsultasAnaliticoRoutingModule {}
