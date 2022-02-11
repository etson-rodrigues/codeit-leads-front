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
import { DateAdapter, MatNativeDateModule} from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { ConsultaProcessosRoutingModule } from './consulta-processos-routing.module';
import { ConsultaProcessosComponent } from './consulta-processos.component';
import { CustomDateAdapter } from 'src/app/core/config/date-adapter';

@NgModule({
  declarations: [
    ConsultaProcessosComponent
  ],
  imports: [
    CommonModule,
    ConsultaProcessosRoutingModule,
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
    MatDividerModule
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ]
})
export class ConsultaProcessosModule { }
