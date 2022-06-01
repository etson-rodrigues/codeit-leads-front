import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { mockCadastroUsuarioResponse } from 'src/app/core/mocks/data/cadastro-usuario-mock';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { GerenciamentoUsuariosModule } from '../../gerenciamento-usuarios.module';

import { ConfiguracaoDbjusComponent } from './configuracao-dbjus.component';

describe('ConfiguracaoDbjusComponent', () => {
  let component: ConfiguracaoDbjusComponent;
  let fixture: ComponentFixture<ConfiguracaoDbjusComponent>;
  let cadastroUsuariosService: any;
  let messageTrackerService: any;

  beforeEach(
    waitForAsync(() => {
        const cadastroUsuariosServiceSpy = jasmine.createSpyObj('CadastroUsuariosService', ['save']);
        const messageTrackerServiceSpy = jasmine.createSpyObj('MessageTrackerService', ['subscribeError']);

        TestBed.configureTestingModule({
            declarations: [ConfiguracaoDbjusComponent],
            imports: [GerenciamentoUsuariosModule, RouterTestingModule, NoopAnimationsModule],
            providers: [
                { provide: CadastroUsuariosService, useValue: cadastroUsuariosServiceSpy },
                { provide: MessageTrackerService, useValue: messageTrackerServiceSpy }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ConfiguracaoDbjusComponent);
                cadastroUsuariosService = TestBed.inject(CadastroUsuariosService);
                messageTrackerService = TestBed.inject(MessageTrackerService);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });
    })
  );

  it('[CIT-5940] deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('[CIT-5940] deve validar formulário vazio', () => {
    expect(component.formConfiguracaoDBJus.valid).withContext('Formulário deve inicializar inválido').toBeFalsy();
  });

  it('[CIT-5940] deve validar campo de nome', () => {
    const nomeInput = component.formConfiguracaoDBJus.get('nome');
    fixture.detectChanges();
    expect(nomeInput!.valid).withContext('Campo nome deve inicializar inválido').toBeFalsy();

    nomeInput!.setValue('');
    fixture.detectChanges();
    expect(nomeInput!.hasError('required')).withContext('Campo nome é obrigatório').toBeTruthy();
  });

  it('[CIT-5940] deve validar campo de senha DBJus', () => {
    const senhaDBJusInput = component.formConfiguracaoDBJus.get('senhaDBJus');
    fixture.detectChanges();
    expect(senhaDBJusInput!.valid).withContext('Campo senha DBJus deve inicializar inválido').toBeFalsy();

    senhaDBJusInput!.setValue('');
    fixture.detectChanges();
    expect(senhaDBJusInput!.hasError('required')).withContext('Campo senha DBJus é obrigatório').toBeTruthy();
  });

  it('[CIT-5940] deve validar campo de quantidade de creditos', () => {
    const quantidadeCreditosInput = component.formConfiguracaoDBJus.get('quantidadeCreditos');
    fixture.detectChanges();
    expect(quantidadeCreditosInput!.valid).withContext('Campo quantidade de creditos deve inicializar inválido').toBeFalsy();

    quantidadeCreditosInput!.setValue('');
    fixture.detectChanges();
    expect(quantidadeCreditosInput!.hasError('required')).withContext('Campo quantidade de creditos é obrigatório').toBeTruthy();
  });

  it('[CIT-5940] deve preencher os dados do formulário caso for edição de usuário', () => {
      const data = {
          id: 1,
          email: 'teste@email.com',
          perfil: {
              codigo: '001',
              descricao: 'Administrador'
          },
          usuarioDBJus: {
              nome: "userDBJus_teste",
              senha: "senhaDBJus_teste",
              quantidadeCreditos: 10
          }
      };
      component['_editarService'].setValues(data);
      component.fillFormEditing();
      expect(component.formConfiguracaoDBJus.controls.nome.value).withContext('Campo nome DBJus deve ser preenchido').toEqual('userDBJus_teste');
      expect(component.formConfiguracaoDBJus.controls.senhaDBJus.value).withContext('Campo senha DBJus deve ser preenchido').toEqual('senhaDBJus_teste');
      expect(component.formConfiguracaoDBJus.controls.quantidadeCreditos.value).withContext('Campo quantidade creditos deve ser preenchido').toEqual(10);
  });

  it('[CIT-5940] deve limpar campos do formulário', () => {
      const emailInput = component.formConfiguracaoDBJus.controls.nome;
      emailInput!.setValue('userDBJus_teste');
      fixture.detectChanges();
      component.resetForm();
      expect(emailInput!.value).withContext('Campo nome DBJus deve ser nulo após resetar o formulário').toBeNull();
  });

  it('[CIT-5940] deve cadastrar novo usuário', fakeAsync(() => {
      spyOn(component['_resumoService'], 'setValues');

      component.usuario.email = 'teste@email.com';
      component.usuario.senha = 'senha12345';
      component.usuario.perfil = { codigo: '002', descricao: 'Operador' };

      const nomeDBJusInput = component.formConfiguracaoDBJus.get('nome');
      const senhaDBJusInput = component.formConfiguracaoDBJus.get('senhaDBJus');
      const quantidadeCreditosInput = component.formConfiguracaoDBJus.get('quantidadeCreditos');

      nomeDBJusInput!.setValue('userDBJus_teste');
      senhaDBJusInput!.setValue('senhaDBJus_teste');
      quantidadeCreditosInput!.setValue(10);      

      cadastroUsuariosService.save.and.returnValue(of(mockCadastroUsuarioResponse));

      component.register();

      flush();

      expect(component['_resumoService'].setValues).withContext('Deve chamar função de envio dos dados do usuário ao cadastrar com sucesso').toHaveBeenCalledTimes(1);
  }));

  it('[CIT-5940] deve gerar erro ao cadastrar usuário já existente', fakeAsync(() => {
      spyOn(component['_resumoService'], 'setValues');

      component.usuario.email = 'teste@email.com';
      component.usuario.senha = 'senha12345';
      component.usuario.perfil = { codigo: '002', descricao: 'Operador' };

      const nomeDBJusInput = component.formConfiguracaoDBJus.get('nome');
      const senhaDBJusInput = component.formConfiguracaoDBJus.get('senhaDBJus');
      const quantidadeCreditosInput = component.formConfiguracaoDBJus.get('quantidadeCreditos');

      nomeDBJusInput!.setValue('userDBJus_teste');
      senhaDBJusInput!.setValue('senhaDBJus_teste');
      quantidadeCreditosInput!.setValue(10);    

      cadastroUsuariosService.save.and.returnValue(throwError(() => new Error()));

      component.register();

      flush();

      expect(component['_resumoService'].setValues).withContext('Não deve chamar função de envio dos dados do usuário ao gerar erro ao cadastrar usuário').toHaveBeenCalledTimes(0);
      expect(messageTrackerService.subscribeError).withContext('Deve abrir o messageTracker ao gerar erro ao cadastrar usuário').toHaveBeenCalledTimes(1);
  }));
});
