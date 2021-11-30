import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SidenavComponent } from './sidenav.component';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let autenticacaoService: any;

  beforeEach(waitForAsync(() => {
    const autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['getLoginInfo']);

    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports:[RouterTestingModule],
      providers: [
        { provide: AutenticacaoService, useValue: autenticacaoServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        autenticacaoService = TestBed.inject(AutenticacaoService);
        component = fixture.componentInstance;
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
});
