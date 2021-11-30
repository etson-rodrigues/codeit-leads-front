import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroUsuarioRoutingModule } from './cadastro-usuario-routing.module';
import { CadastroUsuarioComponent } from './cadastro-usuario.component';


@NgModule({
  declarations: [
    CadastroUsuarioComponent
  ],
  imports: [
    CommonModule,
    CadastroUsuarioRoutingModule
  ]
})
export class CadastroUsuarioModule { }
