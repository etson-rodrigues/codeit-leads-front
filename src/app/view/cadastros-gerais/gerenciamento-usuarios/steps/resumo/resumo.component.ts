import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CadastroUsuarioResponse } from 'src/app/core/models/cadastro-usuario';
import { ResumoService } from 'src/app/core/services/resumo/resumo.service';
import { CadastroUsuarioResumo } from './resumo.model';


@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {

  userData: CadastroUsuarioResumo = {
    email: '',
    perfil: {
      descricao: ''
    }
  };

  @Output() isFinished: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _resumoService: ResumoService) { }

  ngOnInit(): void {
    this._resumoService.getValues.subscribe(data => {
      Object.entries(data).map(() => {
        return this.userData = {
          email: data.data.email,
          perfil: {
            descricao: data.data.perfil.descricao
          }
        }
      })
    })
  }

  newSearch() {
    this.isFinished.emit(true)
  }
}
