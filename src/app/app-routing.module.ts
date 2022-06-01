import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/guards/authorization/auth.guard';
import { CadastrosGuard } from './core/auth/guards/cadastros/cadastros.guard';
import { HistoricoConsultasGuard } from './core/auth/guards/historico-consultas/historico-consultas.guard';
import { LoginGuard } from './core/auth/guards/login/login.guard';
import { RedefinirSenhaGuard } from './core/auth/guards/redefinir-senha/redefinir-senha.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./view/login/login.module').then((m) => m.LoginModule),
        canActivate: [LoginGuard]
    },
    {
        path: 'redefinir-senha',
        loadChildren: () => import('./view/login/redefinir-senha/redefinir-senha.module').then((m) => m.RedefinirSenhaModule),
        canActivate: [RedefinirSenhaGuard]
    },
    {
        path: 'processos-judiciais/consulta-geral',
        loadChildren: () => import('./view/processos-judiciais/consulta-geral/processos.module').then((m) => m.ProcessosModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'cadastros-gerais/usuarios',
        loadChildren: () => import('./view/cadastros-gerais/gerenciamento-usuarios/gerenciamento-usuarios.module').then((m) => m.GerenciamentoUsuariosModule),
        canActivate: [AuthGuard, CadastrosGuard]
    },
    {
        path: 'usuario/senha',
        loadChildren: () => import('./view/redefinir-senha/redefinir-senha.module').then((m) => m.RedefinirSenhaModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'historico-consultas/sintetico',
        loadChildren: () => import('./view/historico-consultas/sintetico/historico-consultas-sintetico.module').then((m) => m.HistoricoConsultasSinteticoModule),
        canActivate: [AuthGuard, HistoricoConsultasGuard]
    },
    {
        path: 'seletor-temas',
        loadChildren: () => import('./view/seletor-temas/seletor-temas.module').then((m) => m.SeletorTemasModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'pagina-nao-encontrada',
        loadChildren: () => import('./view/pagina-nao-encontrada/pagina-nao-encontrada.module').then((m) => m.PaginaNaoEncontradaModule)
    },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
