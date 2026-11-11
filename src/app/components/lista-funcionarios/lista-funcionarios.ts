
import { Component, inject, OnInit, signal } from '@angular/core';
import { Colaborador } from '../../models/colaborador';
import { ColaboradoresService } from '../../services/colaboradores';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.html',
  styleUrl: './lista-funcionarios.css',
})
export class ListaFuncionarios implements OnInit {

  private readonly colaboradoresService = inject(ColaboradoresService);

  protected readonly colaboradores = signal<Colaborador[]>([]);
  protected readonly carregando = signal(true);
  protected readonly erro = signal('');
  protected readonly mensagem = signal('');

  ngOnInit(): void {
    this.colaboradoresService.listar().subscribe({
      next: (lista) => {
        this.colaboradores.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os colaboradores.');
        this.carregando.set(false);
      },
    });
  }

  excluir(id: number): void {
    this.mensagem.set('');
    this.erro.set('');

    this.colaboradoresService.excluir(id).subscribe({
      next: () => {
        this.colaboradores.update(lista =>
          lista.filter(colaborador => colaborador.id !== id)
        );

        this.mensagem.set('Colaborador excluído com sucesso!');
      },
      error: () => {
        this.erro.set('Não foi possível excluir o colaborador!');
      },
    });
  }
}
