import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ChavesLocalStorage } from '../../enums/local-storage.enum';
import { Autenticacao } from '../../models/autenticacao';
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
    const localStorageData: Autenticacao = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');

    if (Object.values(localStorageData).length == 0) {
      return;
    }

    this.accessData = localStorageData;
  }

  toggleSidenav() {
    this.openMenu.emit();
  }

  profileAccess() {
    return this.accessData.perfil.descricao == 'Administrador';
  }
}