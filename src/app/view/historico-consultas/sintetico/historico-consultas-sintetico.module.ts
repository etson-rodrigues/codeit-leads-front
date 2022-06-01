import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoConsultasSinteticoComponent } from './historico-consultas-sintetico.component';
import { HistoricoConsultasSinteticoRoutingModule } from './historico-consultas-sintetico-routing.module';
import { HistoricoConsultasSinteticoVisualizarHistoricosComponent } from './visualizar-historicos/historico-consultas-sintetico-visualizar-historicos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';
import { CustomDateAdapter } from 'src/app/core/config/date-adapter';

@NgModule({
  declarations: [HistoricoConsultasSinteticoComponent, HistoricoConsultasSinteticoVisualizarHistoricosComponent],
  imports: [
    CommonModule,
    HistoricoConsultasSinteticoRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDividerModule,
    MatStepperModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    DialogModule
  ],
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class HistoricoConsultasSinteticoModule { }
