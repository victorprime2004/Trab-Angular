import { Routes } from '@angular/router';
import { Cadastro } from './components/cadastro/cadastro';
import { Login } from './components/login/login';
import { ListaFuncionarios } from './components/lista-funcionarios/lista-funcionarios';
import { FormularioFuncionarios } from './components/formulario-funcionarios/formulario-funcionarios';
import { Enderecos } from './components/enderecos/enderecos';
import { Contatos } from './components/contatos/contatos';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'cadastro', component: Cadastro },

  { path: 'login', component: Login },

  { path: 'lista-funcionarios', component: ListaFuncionarios },

  { path: 'formulario-funcionarios', component: FormularioFuncionarios },
  
  { path: 'enderecos', component: Enderecos },

  { path: 'contatos', component: Contatos },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },

  // rotas protegidas
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'lista-funcionarios', component: ListaFuncionarios },
      { path: 'formulario-funcionarios', component: FormularioFuncionarios },
      { path: 'enderecos', component: Enderecos },
      { path: 'contatos', component: Contatos },
    ],
  },
  
  { path: '**', redirectTo: 'login' },


];
