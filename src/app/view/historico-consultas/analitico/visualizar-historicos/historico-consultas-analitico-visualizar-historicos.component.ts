import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { setPaginatorConfig } from 'src/app/core/config/paginator-config';
import { CriterioData } from 'src/app/core/enums/criterio-data.enum';
import { ChavesLocalStorage } from 'src/app/core/enums/local-storage.enum';
import { Perfil } from 'src/app/core/enums/perfil.enum';
import { SituacaoConsulta } from 'src/app/core/enums/situacao-consulta.enum';
import { TipoConsulta } from 'src/app/core/enums/tipo-consulta.enum';
import { Autenticacao } from 'src/app/core/models/autenticacao/autenticacao.model';
import { ConsultaUsuarioResponseData } from 'src/app/core/models/gerenciamento-usuarios/consulta-usuario-response.model';
import { HistoricoConsultasAnaliticoResponseData } from 'src/app/core/models/historico-consultas/historico-consultas-analitico-response.model';
import { HistoricoConsultasRequest } from 'src/app/core/models/historico-consultas/historio-consultas-request.model';
import { CadastroUsuariosService } from 'src/app/core/services/cadastro-usuarios/cadastro-usuarios.service';
import { ExportarHistoricoConsultasService } from 'src/app/core/services/exportar-historico-consultas/exportar-historico-consultas.service';
import { HistoricoConsultasService } from 'src/app/core/services/historico-consultas/historico-consultas.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { compareDateValidator } from 'src/app/core/validators/compare-date-validator';
import { dateFormatValidator } from 'src/app/core/validators/date-format-validator';
import { validationInput } from 'src/app/core/validators/error-input';
import { maxDateValidator } from 'src/app/core/validators/max-date-validator';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';
import { HistoricoConsultasFilterOptions, HistoricoConsultasSelectedFilters, HistoricoConsultasAnaliticoView, UsuarioFilter } from './historico-consultas-analitico-visualizar-historicos.model';
import { HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent } from './resultado/historico-consultas-analitico-visualizar-historicos-resultado.component';

@Component({
  selector: 'app-historico-consultas-analitico-visualizar-historicos',
  templateUrl: './historico-consultas-analitico-visualizar-historicos.component.html',
  styleUrls: ['./historico-consultas-analitico-visualizar-historicos.component.scss']
})
export class HistoricoConsultasAnaliticoVisualizarHistoricosComponent implements OnInit {
  formConsulta: FormGroup = new FormGroup({});
  searchParameters!: HistoricoConsultasRequest;
  tipoConsultaOptions: HistoricoConsultasFilterOptions[] = [
    { value: TipoConsulta.Pesquisa, viewValue: 'Pesquisa' },
    { value: TipoConsulta.DetalhesProcesso, viewValue: 'Detalhes Processo' },
    { value: TipoConsulta.ExportacaoPesquisa, viewValue: 'Exportação' },
    { value: TipoConsulta.ExportacaoPesquisaDetalhesProcesso, viewValue: 'Exportação com Detalhes Processo' }
  ];
  situacaoConsultaOptions: HistoricoConsultasFilterOptions[] = [
    { value: SituacaoConsulta.Sucesso, viewValue: 'Sucesso' },
    { value: SituacaoConsulta.Erro, viewValue: 'Erro' }
  ];
  maxDate: Date = new Date();
  filters: HistoricoConsultasSelectedFilters[] = [];

  searchResult!: HistoricoConsultasAnaliticoView[];
  usuarios: UsuarioFilter[] = [];
  accessData!: Autenticacao;
  displayedColumns: string[] = ['dataConsulta', 'usuarioEmail', 'razaoSocial', 'nup', 'valorCausa', 'criterioData',  'dataInicial', 'dataFinal', 'tribunais', 'uf', 'pagina', 'tipoConsulta', 'situacaoConsulta', 'quantidadeCreditos','json'];

  totalRecords!: number;
  pageSize!: number;

  downloadAnchor: HTMLAnchorElement = document.createElement('a');

  saldoDisponivel: number = 0;
  showSaldoDisponivel: boolean = false;

  @ViewChild('formDirective') formDirective!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
    private _cadastroUsuariosService: CadastroUsuariosService,
    private _historicoConsultasService: HistoricoConsultasService,
    private _exportarHistoricoConsultasService: ExportarHistoricoConsultasService,
    private _dialog: MatDialog,
    private _spinnerService: NgxSpinnerService,
    private _messageTrackerService: MessageTrackerService
  ) { }

  ngOnInit(): void {
    this.formConsulta = this._formBuilder.group(
      {
        usuarioEmail: [''],
        tipoConsulta: [''],
        situacaoConsulta: [''],
        dataInicial: ['', [dateFormatValidator, maxDateValidator]],
        dataFinal: ['', [dateFormatValidator, maxDateValidator]]
      },
      {
        validator: compareDateValidator('dataInicial', 'dataFinal')
      } as AbstractControlOptions
    );
    this.GetAccessData();
    this.GetUsuarios();
  }

  GetAccessData() {
    if (Object.values(JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}')).length == 0) {
      return;
    }
    this.accessData = JSON.parse(this._localStorageService.getItemLocalStorage(ChavesLocalStorage.UserInfo) || '{}');
  }

  GetUsuarios() {
    this._cadastroUsuariosService
      .getAll()
      .subscribe({
        next: (response) => {
          this.usuarios = response.data.map((item: ConsultaUsuarioResponseData) => {
            return {
              id: item.id,
              email: item.email
            };
          });
        },
        error: (error) => {
          this._messageTrackerService.subscribeError(error.error);
        }
      });
  }

  isAdministrador() {
    return this.accessData.perfil.codigo == Perfil.Administrador;
  }

  search() {
    if (this.formConsulta.valid) {

      let usuarioEmailInput: string = this.formConsulta.controls.usuarioEmail.value;
      let tipoConsultaInput: string = this.formConsulta.controls.tipoConsulta.value;
      let situacaoConsultaInput: string = this.formConsulta.controls.situacaoConsulta.value;
      let dataInicialInput: Date = this.formConsulta.controls.dataInicial.value;
      let dataFinalInput: Date = this.formConsulta.controls.dataFinal.value;

      let usuarioEmail: string | null = usuarioEmailInput ? usuarioEmailInput : null;
      let tipoConsulta: string | null = tipoConsultaInput ? tipoConsultaInput : null;
      let situacaoConsulta: string | null = situacaoConsultaInput ? situacaoConsultaInput : null;
      let dataInicial: string | null = dataInicialInput ? formatarDataPtBr(dataInicialInput.toString()) : null;
      let dataFinal: string = dataFinalInput ? formatarDataPtBr(dataFinalInput.toString()) : formatarDataPtBr(new Date().toString());

      this.searchParameters = {
        usuarioEmail,
        tipoConsulta,
        situacaoConsulta,
        dataInicial,
        dataFinal
      };

      this.addFilter(this.searchParameters);

      this._spinnerService.show();
      this._historicoConsultasService
        .getAnaliticoBy(this.searchParameters, 1, 10)
        .pipe(finalize(() => this._spinnerService.hide()))
        .subscribe({
          next: (response) => {
            this.searchResult = response.data.map((item: HistoricoConsultasAnaliticoResponseData) => {
              return {
                dataConsulta:  new Date(item.dataConsulta).toLocaleDateString('pt-br') + ' ' + new Date(item.dataConsulta).toLocaleTimeString('pt-br'),
                usuarioEmail: item.usuarioEmail.split('@')[0],
                razaoSocial: item.razaoSocial,
                nup: item.nup,
                valorCausa: item.valorCausa,
                criterioData: item.criterioData,
                dataInicial: item.dataInicial ? formatarDataPtBr(item.dataInicial) : '',
                dataFinal: item.dataFinal ? formatarDataPtBr(item.dataFinal) : '',
                tribunais: item.tribunais,
                uf: item.uf,
                pagina: item.pagina,
                tipoConsulta: item.tipoConsulta,
                situacaoConsulta: item.situacaoConsulta,
                quantidadeCreditos: item.quantidadeCreditos,
                resultado: item.resultado
              };
            });

            this.totalRecords = response.totalRecords;
            this.pageSize = response.pageSize;
            this.paginator.firstPage();
            this.getSaldoDisponivel();
            setPaginatorConfig(this.paginator);
          },
          error: (error) => {
            this._messageTrackerService.subscribeError(error.error);
          }
        });

    }

  }

  onPageChange(event: PageEvent) {
    const pageNumber = event.pageIndex + 1;

    this._spinnerService.show();
    this._historicoConsultasService
      .getAnaliticoBy(this.searchParameters, pageNumber, 10)
      .pipe(finalize(() => this._spinnerService.hide()))
      .subscribe({
        next: (response) => {
          this.searchResult = response.data.map((item: HistoricoConsultasAnaliticoResponseData) => {
            return {
              dataConsulta: new Date(item.dataConsulta).toLocaleDateString('pt-br') + ' ' + new Date(item.dataConsulta).toLocaleTimeString('pt-br'),
              usuarioEmail: item.usuarioEmail.split('@')[0],
              razaoSocial: item.razaoSocial,
              nup: item.nup,
              valorCausa: item.valorCausa,
              criterioData: item.criterioData,
              dataInicial: item.dataInicial ? formatarDataPtBr(item.dataInicial) : '',
              dataFinal: item.dataFinal ? formatarDataPtBr(item.dataFinal) : '',
              tribunais: item.tribunais,
              uf: item.uf,
              pagina: item.pagina,
              tipoConsulta: item.tipoConsulta,
              situacaoConsulta: item.situacaoConsulta,
              quantidadeCreditos: item.quantidadeCreditos,
              resultado: item.resultado
            };
          });

          this.totalRecords = response.totalRecords;
          this.pageSize = response.pageSize;
          this.getSaldoDisponivel();
          setPaginatorConfig(this.paginator);
        },
        error: (error) => {
          this._messageTrackerService.subscribeError(error.error);
        }
      });
  }

  export() {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        titulo: `DESEJA EXPORTAR PARA PLANILHA TODOS OS DADOS DO RESULTADO DA PESQUISA?`,
        mensagem: '',
        tipo: 'question'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._spinnerService.show();
        this._exportarHistoricoConsultasService
          .exportAnalitico(this.searchParameters)
          .pipe(finalize(() => this._spinnerService.hide()))
          .subscribe({
            next: (response) => {
              const file = new window.Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              this.downloadAnchor.style.display = 'none';
              const fileURL = URL.createObjectURL(file);
              this.downloadAnchor.href = fileURL;
              this.downloadAnchor.download = `planilha-historico-consultas-analitico-${formatarDataPtBr(new Date().toString())}.xlsx`;
              this.downloadAnchor.click();
            },
            error: (error) => {
              this._messageTrackerService.subscribeError(error.error);
            }
          });
      }
    });
  }

  addFilter(searchParameters: HistoricoConsultasRequest) {
    this.filters = [];
    let name: string;
    Object.entries(searchParameters).forEach(([key, value]) => {
      if (!value) {
        return;
      }
      switch (key) {
        case 'usuarioEmail':
          name = 'E-mail';
          break;
        case 'tipoConsulta':
          name = 'Tipo de consulta';
          break;
        case 'situacaoConsulta':
          name = 'Situação da consulta';
          break;
        case 'dataInicial':
          name = 'Data Inicial';
          break;
        case 'dataFinal':
          name = 'Data Final';
          break;
      }

      switch (value) {
        case TipoConsulta.Pesquisa:
          value = 'Pesquisa';
          break;
        case TipoConsulta.DetalhesProcesso:
          value = 'Detalhes Processo';
          break;
        case TipoConsulta.ExportacaoPesquisa:
          value = 'Exportação';
          break;
        case TipoConsulta.ExportacaoPesquisaDetalhesProcesso:
          value = 'Exportação com Detalhes Processo';
          break;
        case SituacaoConsulta.Sucesso:
          value = 'Sucesso';
          break;
        case SituacaoConsulta.Erro:
          value = 'Erro';
          break;
      }

      this.filters.push({ key: key, name: `${name}: ${value}` });
    });

  }

  getDescricaoTipoConsulta(field: string): string {
    let value: string = '';

    if (field == null || field == undefined)
      return value;

    switch (field) {
      case TipoConsulta.Pesquisa:
        value = 'Pesquisa';
        break;
      case TipoConsulta.DetalhesProcesso:
        value = 'Detalhes Processo';
        break;
      case TipoConsulta.ExportacaoPesquisa:
        value = 'Exportação';
        break;
      case TipoConsulta.ExportacaoPesquisaDetalhesProcesso:
        value = 'Exportação com Detalhes Processo';
        break;
      default:
        value = field;
        break;
    }

    return value;
  }

  getDescricaoCriterioData(field: string): string {
    let value: string = '';

    if (field == null || field == undefined)
      return value;

    switch (field) {
      case CriterioData.CriacaoProcesso:
        value = 'Criação do Processo';
        break;
      case CriterioData.UltimoAndamento:
        value = 'Último Andamento';
        break;
      case CriterioData.UltimaAtualizacao:
        value = 'Última Atualização';
        break;
      default:
        value = field;
        break;
    }

    return value;
  }

  cleanFilter() {
    this.formDirective.resetForm();
    this.filters = [];
  }

  removeFilter(filter: HistoricoConsultasSelectedFilters) {
    const index = this.filters.findIndex((filtro) => filtro.key == filter.key);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
    this.formConsulta.get(filter.key)?.reset();
  }

  validationInput(formControlName: string): string | undefined {
    return validationInput(this.formConsulta, formControlName);
  }

  validateEmptyField(event: any, field: string) {
    if (!event.target.value.trim()) {
      this.formConsulta.controls[field].setValue(null);
      this.formConsulta.controls[field].setErrors(null);
      this.formConsulta.controls[field].markAsPristine();
      this.formConsulta.controls[field].markAsUntouched();
    }
  }

  private getSaldoDisponivel() {
    this.saldoDisponivel = 0;
    this.showSaldoDisponivel = false;

    let email: string | null = this.isAdministrador() ? this.searchParameters.usuarioEmail : this.accessData.email;
    if (email == null || email == undefined)
      return;

    this._historicoConsultasService
      .getSaldoDisponivel(email)
      .subscribe({
        next: (response) => {
          this.saldoDisponivel = response.data;
          this.showSaldoDisponivel = true;
        },
        error: (error) => {
          this._messageTrackerService.subscribeError(error.error);
        }
      });
  }

  visualizarResultado(historicoConsultaAnalitico: HistoricoConsultasAnaliticoView) {
    this._dialog.open(HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent, {
      width: '75vw',
      maxHeight: '100vh',
      data: {
        value: historicoConsultaAnalitico.resultado,
        title: 'Resultado JSON'
      }
    });
  }
}
