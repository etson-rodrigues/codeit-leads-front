import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AcoesSeguranca } from '../../enums/acoes-seguranca.enum';
import { ChavesLocalStorage } from '../../enums/local-storage.enum';
import { Autenticacao } from '../../models/autenticacao/autenticacao.model';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() openMenu: EventEmitter<boolean> = new EventEmitter();
  accessData!: Autenticacao;

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    if (Object.values(JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}')).length == 0) {
      return;
    }
    this.accessData = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');
  }

  toggleSidenav() {
    this.openMenu.emit();
  }

  profileAccess(perfil: string) {
    switch (perfil) {
      case 'cadastro':
        return this.accessData.perfil.acoesSeguranca.find(acao => acao.acaoSeguranca.codigo == AcoesSeguranca.CadastroUsuarios);
      default:
        break;
    }
  }
}