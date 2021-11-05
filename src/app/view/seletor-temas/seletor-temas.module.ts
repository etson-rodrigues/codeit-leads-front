import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { SeletorTemasComponent } from './seletor-temas.component';
import { SeletorTemasRoutingModule } from './seletor-temas-routing.module';

@NgModule({
  declarations: [SeletorTemasComponent],
  imports: [
    CommonModule,
    SeletorTemasRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class SeletorTemasModule { }
