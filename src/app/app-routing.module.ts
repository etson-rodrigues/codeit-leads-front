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
    path: 'consulta-processos',
    loadChildren: () => import('./view/consulta-processos/consulta-processos.module').then(m => m.ConsultaProcessosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./view/cadastro-usuario/cadastro-usuario.module').then(m => m.CadastroUsuarioModule),
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
