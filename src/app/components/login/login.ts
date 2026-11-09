import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly carregando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  protected entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.carregando.set(true);
    this.erro.set(null);


    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/lista-funcionarios']),
      error: () => {
        this.erro.set('E-mail ou senha inválidos.');
        this.carregando.set(false);

      }

    });

  }

}




