import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GerenciamentoUsuariosComponent } from './gerenciamento-usuarios.component';
import { GerenciamentoUsuariosRoutingModule } from './gerenciamento-usuarios-routing.module';
import { ConsultaComponent } from './steps/consulta/consulta.component';
import { CadastroComponent } from './steps/cadastro/cadastro.component';
import { ResumoComponent } from './steps/resumo/resumo.component';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';

@NgModule({
    declarations: [GerenciamentoUsuariosComponent, ConsultaComponent, CadastroComponent, ResumoComponent],
    imports: [
        CommonModule,
        GerenciamentoUsuariosRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatSelectModule,
        MatPaginatorModule,
        DialogModule
    ]
})
export class GerenciamentoUsuariosModule {}
