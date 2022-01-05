import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { setPaginatorConfig } from 'src/app/core/config/paginator-config';
import { ConsultaProcessosService } from 'src/app/core/services/consulta-processos/consulta-processos.service';
import { MessageTrackerService } from 'src/app/core/services/message-tracker/message-tracker.service';
import { validationInput } from 'src/app/core/validators/error-input';
import { formatarData } from 'src/app/shared/utils/formatarData';
import { ConsultaProcessosView } from './consulta-processos.model';
import { CadastroUsuarioResponseData } from 'src/app/core/models/consulta-processos';
import { Uf } from 'src/app/shared/enums/uf.enum';

@Component({
  selector: 'app-consulta-processos',
  templateUrl: './consulta-processos.component.html',
  styleUrls: ['./consulta-processos.component.scss']
})
export class ConsultaProcessosComponent implements OnInit {
  formConsulta!: FormGroup;
  razaoSocialInput: string = '';

  searchResult!: ConsultaProcessosView[];
  displayedColumns: string[] = ['nup', 'uf', 'partesAtivas', 'partesPassivas', 'primeiraData', 'dataUltimaAtualizacao'];

  totalRecords!: number;
  pageSize!: number;

  @ViewChild('formDirective') formDirective!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private _consultaProcessosServices: ConsultaProcessosService,
    private _spinner: NgxSpinnerService,
    private _messageTrackerService: MessageTrackerService
  ) { }

  ngOnInit(): void {
    this.formConsulta = this._formBuilder.group({
      razaoSocial: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]]
    });
  }

  search() {
    if (this.formConsulta.controls.razaoSocial.valid) {
      this.razaoSocialInput = this.formConsulta.controls.razaoSocial.value;
      this._spinner.show();
      this._consultaProcessosServices
        .get(this.razaoSocialInput, 1, 10)
        .pipe(finalize(() => this._spinner.hide()))
        .subscribe(
          {
            next: (response) => {
              this.searchResult = (response.data.map((item: CadastroUsuarioResponseData) => {
                return {
                  nup: item.numeroUnicoProtocolo,
                  uf: Uf[Number(item.uf.codigo)],
                  dataUltimaAtualizacao: formatarData(item.dataUltimaAtualizacao),
                  partesAtivas: this.formatPartes(item.sumarioInstancias[0].partesAtivas),
                  partesPassivas: this.formatPartes(item.sumarioInstancias[0].partesPassivas),
                  primeiraData: formatarData(item.sumarioInstancias[0].primeiraData),
                }
              }));

              this.totalRecords = response.totalRecords;
              this.pageSize = response.pageSize;
              this.paginator.firstPage();
              setPaginatorConfig(this.paginator);
            },
            error: (error) => {
              this._messageTrackerService.subscribeError(error.error);
            }
          }
        )
    }
  }

  onPageChange(event: PageEvent) {
    const pageNumber = event.pageIndex + 1;

    this._spinner.show();
    this._consultaProcessosServices
      .get(this.razaoSocialInput, pageNumber, 10)
      .pipe(finalize(() => this._spinner.hide()))
      .subscribe(
        {
          next: (response) => {
            this.searchResult = (response.data.map((item: CadastroUsuarioResponseData) => {
              return {
                nup: item.numeroUnicoProtocolo,
                uf: item.uf.descricao,
                dataUltimaAtualizacao: formatarData(item.dataUltimaAtualizacao),
                partesAtivas: item.sumarioInstancias[0].partesAtivas.join(', '),
                partesPassivas: item.sumarioInstancias[0].partesPassivas.join(', '),
                primeiraData: formatarData(item.sumarioInstancias[0].primeiraData),
              }
            }));

            this.totalRecords = response.totalRecords;
            this.pageSize = response.pageSize;
            setPaginatorConfig(this.paginator);
          },
          error: (error) => {
            this._messageTrackerService.subscribeError(error.error);
          }
        }
      )
  }

  cleanFilter() {
    this.formDirective.resetForm();
  }

  validationInput(formControlName: string): string | undefined {
    return validationInput(this.formConsulta, formControlName);
  }

  formatPartes(partes: string[]) {
    if (partes.length == 0) return '';
    let partesArray: string[] = [];
    let sufix = '';
    let numberOfElements = 5;
    let numberOfCharacters = 50;
    if (partes.length > 1) {
      partes.slice(0, numberOfElements).forEach((parte => {
        sufix = parte.length > numberOfCharacters ? '...' : ',';
        partesArray.push(parte.trim().slice(0, numberOfCharacters) + sufix);
      }));
      partesArray.push('ENTRE OUTROS...');
      return partesArray.join('\r\n');
    }
    sufix = partes.length > numberOfCharacters ? '...' : '';
    return partes[0].trim().slice(0, numberOfCharacters) + sufix;
  }
}