import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeletorTemasComponent } from './seletor-temas.component';

const routes: Routes = [{ path: '', component: SeletorTemasComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeletorTemasRoutingModule {}
