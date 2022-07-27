import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { StepperService } from 'src/app/core/services/stepper/stepper.service';
import { AndamentoResponse, DetalhesProcesso } from 'src/app/core/models/detalhes-processo/detalhes-processo-response.model';
import { AndamentoView, DetalhesProcessoView, ParteView } from './detalhes-processo.model';
import { formatarDataPtBr } from 'src/app/shared/utils/formatar-data';

@Component({
    selector: 'app-detalhes-processo',
    templateUrl: './detalhes-processo.component.html',
    styleUrls: ['./detalhes-processo.component.scss']
})
export class DetalhesProcessoComponent implements OnInit, OnChanges {
    dadosProcesso!: DetalhesProcessoView;

    displayedColumnsPartesReceitaPj: string[] = ['cnpj', 'nome', 'atividadePrincipalDescricao', 'situacao', 'capitalSocial', 'endereco', 'telefone', 'email'];
    displayedColumns: string[] = ['data', 'descricao', 'detalhe'];

    displayRows: number = 10;

    @Input() detalhesProcesso!: DetalhesProcesso;

    constructor(private _stepperService: StepperService) {}

    ngOnInit(): void {
        this.updateDadosProcesso();
    }

    ngOnChanges(): void {
        this.updateDadosProcesso();
    }

    updateDadosProcesso() {
        this.dadosProcesso = {
            nup: this.detalhesProcesso.nup,
            valorCausa: this.detalhesProcesso.valorCausa,
            dataAutuacao: this.detalhesProcesso.dataAutuacao ? formatarDataPtBr(this.detalhesProcesso.dataAutuacao) : '',
            dataInicial: this.detalhesProcesso.dataInicial ? formatarDataPtBr(this.detalhesProcesso.dataInicial) : '',
            vara: this.detalhesProcesso.vara,
            comarca: this.detalhesProcesso.comarca,
            uf: this.detalhesProcesso.uf.descricao,
            ativas: this.detalhesProcesso.partes.partesAtivas,
            passivas: this.detalhesProcesso.partes.partesPassivas,
            outras: this.detalhesProcesso.partes.outrasPartes,
            partesReceitaPj: this.detalhesProcesso.partesReceitaPj,
            andamentos: this.formatAndamentos().slice(0, this.displayRows)
        };
    }

    showMore() {
        this.displayRows = this.displayRows + 10;
        this.dadosProcesso.andamentos = this.formatAndamentos().slice(0, this.displayRows);
    }

    formatAndamentos() {
        return this.detalhesProcesso.andamentos
            .map((andamento: AndamentoResponse) => {
                return {
                    data: formatarDataPtBr(andamento.data),
                    descricao: andamento.descricao,
                    detalhe: andamento.detalhes
                };
            })
            .sort((a: AndamentoView, b: AndamentoView) => {
                const dataA = new Date(a.data.split('/').reverse().join()).getTime();
                const dataB = new Date(b.data.split('/').reverse().join()).getTime();
                return dataB - dataA;
            });
    }

    getParteDescricao(parte: ParteView) {
        let value: string = '';

        if (parte == null || parte == undefined)
            return value;

        value = parte.nome;

        if (parte.cnpj != null) {
            value += " - " + parte.cnpj;
        }            
        else if (parte.cpf != null) {
            value += " - " + parte.cpf;
        }        

        return value;
    }

    return() {
        this._stepperService.previous();
    }
}
