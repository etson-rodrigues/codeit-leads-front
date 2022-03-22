import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { PaginaNaoEncontradaRoutingModule } from './pagina-nao-encontrada-routing.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { TimerModule } from '../../shared/components/timer/timer.module';

@NgModule({
    declarations: [PaginaNaoEncontradaComponent],
    imports: [CommonModule, PaginaNaoEncontradaRoutingModule, TimerModule, MatButtonModule]
})
export class PaginaNaoEncontradaModule {}
