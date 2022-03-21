import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { ProcessosRoutingModule } from './processos-routing.module';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';
import { ProcessosComponent } from './processos.component';
import { DetalhesProcessoComponent } from './detalhes-processo/detalhes-processo.component';
import { ConsultaProcessosComponent } from './consulta-processos/consulta-processos.component';
import { CustomDateAdapter } from 'src/app/core/config/date-adapter';

@NgModule({
  declarations: [
    ProcessosComponent,
    ConsultaProcessosComponent,
    DetalhesProcessoComponent
  ],
  imports: [
    CommonModule,
    ProcessosRoutingModule,
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
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ]
})
export class ProcessosModule { }
