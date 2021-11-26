import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaProcessosRoutingModule } from './consulta-processos-routing.module';
import { ConsultaProcessosComponent } from './consulta-processos.component';


@NgModule({
  declarations: [
    ConsultaProcessosComponent
  ],
  imports: [
    CommonModule,
    ConsultaProcessosRoutingModule
  ]
})
export class ConsultaProcessosModule { }
