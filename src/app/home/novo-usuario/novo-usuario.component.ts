import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { NovoUsuario } from './novo-usuario';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo.validator';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent {
  novoUsuarioForm!: FormGroup; // ! = pode ser nulo ou não

  constructor(private formBuilder: FormBuilder, private novoUsuarioService: NovoUsuarioService, private usuarioExistenteService: UsuarioExisteService,
    private router: Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator], [this.usuarioExistenteService.usuarioJaExiste()]],
      password: ['']
    },
      {
        validators: [usuarioSenhaIguaisValidator]
      }
    )
  }

  cadastrar() {
    if (this.novoUsuarioForm) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => {
        this.router.navigate([''])
      },
        (error) => {
          console.log(error)
        })
    }
  }

}
