import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./view/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'processos-judiciais/consulta-geral',
    loadChildren: () => import('./view/processos-judiciais/consulta-geral/consulta-processos.module').then(m => m.ConsultaProcessosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastros-gerais/usuarios',
    loadChildren: () => import('./view/cadastros-gerais/gerenciamento-usuarios/gerenciamento-usuarios.module').then(m => m.GerenciamentoUsuariosModule),
    canActivate: [AuthGuard]
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
