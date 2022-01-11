import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
    },
    status: ''
  };

  isEdited: boolean = false;

  @Output() isFinished: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _resumoService: ResumoService) { }

  ngOnInit(): void {
    this._resumoService.getValues.subscribe(data => {
      Object.entries(data).forEach(() => {
        return this.userData = {
          email: data.email,
          perfil: {
            descricao: data.perfil.descricao
          },
          status: data.ativo ? 'Ativo' : 'Inativo'
        }
      })
    });
    this._resumoService.getIsEditing.subscribe(data => {
      return this.isEdited = data;
    })
  }

  newSearch() {
    this.isFinished.emit(true)
  }
}
