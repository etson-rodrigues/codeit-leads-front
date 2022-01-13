import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedefinirSenhaComponent } from './redefinir-senha.component';

const routes: Routes = [{ path: '', component: RedefinirSenhaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedefinirSenhaRoutingModule { }
