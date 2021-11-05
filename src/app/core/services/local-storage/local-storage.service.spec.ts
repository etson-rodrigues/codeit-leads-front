import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

const item = {
  name: 'teste',
  value: 'eyJhbGciOiJIUzI1NiIsInR87iJIUz.eyJlbWgdfgdfhhjdgdYmYiOjE2MzU3ODkB81FEVg'
};

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    window.localStorage.clear();
  });

  it('[CIT-5596] deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('[CIT-5596] deve salvar um item no local storage', () => {
    service.setItemLocalStorage(item.value, item.name);
    expect(service.getItemLocalStorage(item.name)).toEqual(item.value);
  });

  it('[CIT-5596] deve remover um item especifico no local storage', () => {
    service.setItemLocalStorage(item.value, item.name);
    expect(service.getItemLocalStorage(item.name)).toEqual(item.value);

    service.removeItemLocalStorage(item.name);
    expect(service.getItemLocalStorage(item.name)).toBeNull();
  });

  it('[CIT-5596] deve limpar o local storage', fakeAsync(() => {
    const itens = [
      {
        name: 'teste',
        value: 'eyJhbGciOiJIUzI1NiIsInR87hhjhkf45fdscsvsvr3werterhdb.eyJlbWgdfgdfhhjdgdYmYiOjE2MzU3ODkB81FEVg'
      },
      {
        name: 'teste1',
        value: 'eyJhbGciOiJIUzI1NiIsInR87hhjhkf45fdscsvsvr3werterhdb.eyJlbWgdfgdfhhjdgdYmYiOjE2MzU3ODkB81FEVg'
      },
      {
        name: 'teste2',
        value: 'eyJhbGciOiJIUzI1NiIsInR87hhjhkf45fdscsvsvr3werterhdb.eyJlbWgdfgdfhhjdgdYmYiOjE2MzU3ODkB81FEVg'
      }
    ];

    for (let item of itens) {
      service.setItemLocalStorage(item.value, item.name);
    }

    let itensLocalStorage: Array<any> = [];
    for (let item of itens) {
      itensLocalStorage.push(service.getItemLocalStorage(item.name));
    }
    expect(itensLocalStorage).not.toBeUndefined();
    expect(itensLocalStorage.length).toEqual(3);
    expect(itensLocalStorage[1]).toEqual(itens[1].value);

    service.clearLocalStorage();
    for (let item of itens) {
      expect(service.getItemLocalStorage(item.name)).toBeNull();
    }

    flush();
  }));

  it('[CIT-5596] deve retornar true se existe o item no local storage', () => {
    service.setItemLocalStorage(item.value, item.name);
    expect(service.hasItemLocalStorage(item.name)).toBeTruthy();
  });
});
