import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RedefinirSenhaRoutingModule } from './redefinir-senha-routing.module';
import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';


@NgModule({
  declarations: [
    RedefinirSenhaComponent
  ],
  imports: [
    CommonModule,
    RedefinirSenhaRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DialogModule
  ]
})
export class RedefinirSenhaModule { }
