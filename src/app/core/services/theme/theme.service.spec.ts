import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { mockThemes, mockTheme, mockTheme1 } from '../../mocks/data/theme-mock';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
    localStorage.clear();

    spyOn(service, "handleChangeTheme");
  });

  it('[CIT-5596] deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('[CIT-5596] deve salvar e carregar o tema no local storage', () => {
    service.setTheme(mockTheme);
    expect(service.getTheme()).toEqual(mockTheme);
  });

  it('[CIT-5596] deve salvar e carregar os temas do local storage', () => {
    service.setThemes();
    expect(service.getThemes()).toEqual(mockThemes);
  });

  it('[CIT-5596] deve retornar um array vazio do local storage', () => {
    service.themesLocalStorage = [];
    expect(service.getThemes()).toEqual([]);
  });

  it('[CIT-5596] deve retornar nome personalizado do tema', () => {
    expect(service.replaceThemeName('Empresa Teste')).toEqual('empresa-teste-theme');
  });

  it('[CIT-5596] deve criar um tema de acordo com o nome da empresa', () => {
    expect(service.createTheme('teste01')).toEqual(mockTheme);
  });

  it('[CIT-5596] deve inserir temas e tema selecionado no local storage e injetar no HTML a classe padrão', () => {
    service.initThemes();

    expect(service.getTheme()).toEqual(mockTheme1);
    expect(service.getThemes()).toEqual(mockThemes);
  });

  it('[CIT-5596] deve injetar a classe passada na função no HTML', () => {
    service.handleChangeTheme('teste1-theme');
    expect(service.handleChangeTheme).toHaveBeenCalledTimes(1);
  });
});
