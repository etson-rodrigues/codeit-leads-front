import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Autenticacao } from '../../models/autenticacao';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() openMenu: EventEmitter<boolean> = new EventEmitter();
  accessData!: Autenticacao;

  constructor(private _autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
    this.accessData = this._autenticacaoService.getLoginInfo();
  }

  toggleSidenav() {
    this.openMenu.emit();
  }

  profileAccess() {
    return this.accessData.perfil.descricao == 'Administrador';
  }
}
