import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./view/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'consulta-processos',
    loadChildren: () => import('./view/consulta-processos/consulta-processos.module').then(m => m.ConsultaProcessosModule)
  },
  {
    path: 'seletor-temas',
    loadChildren: () =>
      import('./view/seletor-temas/seletor-temas.module').then(m => m.SeletorTemasModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
