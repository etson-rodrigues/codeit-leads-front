import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./view/home/home.module').then(m => m.HomeModule),
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
