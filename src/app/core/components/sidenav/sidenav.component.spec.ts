import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SidenavComponent } from './sidenav.component';
import { routes } from 'src/app/app-routing.module';
import { SidenavModule } from './sidenav.module';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { mockLoginResponse } from '../../mocks/data/autenticacao-mock';
import { ChavesLocalStorage } from '../../enums/local-storage.enum';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let localStorageService: LocalStorageService;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [
        SidenavModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {
          provide: LocalStorageService, useValue: {
            getItemLocalStorage() {
              return JSON.stringify(mockLoginResponse.data);
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        localStorageService = TestBed.inject(LocalStorageService);
        fixture.detectChanges();
      });
  }));

  it('[CIT-5682] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5682] deve fechar sidenav ao clicar no botão de fechar', () => {
    spyOn(component.openMenu, 'emit');
    component.toggleSidenav();
    expect(component.openMenu.emit).withContext('Deve emitir evento para fechar sidenav ao clicar no botão de fechar').toHaveBeenCalledTimes(1);
  });

  it('[CIT-5819] deve preencher accessData com dados do usuário logado', () => {
    localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo);
    expect(component.accessData).toEqual(mockLoginResponse.data);
  });
});
