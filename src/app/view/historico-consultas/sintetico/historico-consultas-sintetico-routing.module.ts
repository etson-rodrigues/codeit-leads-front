import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoConsultasSinteticoComponent } from './historico-consultas-sintetico.component';

const routes: Routes = [{ path: '', component: HistoricoConsultasSinteticoComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoricoConsultasSinteticoRoutingModule {}
