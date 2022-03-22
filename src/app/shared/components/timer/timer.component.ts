import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit, OnChanges {
    @Input() public tempoSegundos: number = 3;
    @Input() public svgSize: number = 100;
    @Input() public circuloFundoStroke: string = '#FFF';
    @Input() public circuloFundoStrokeWidth: number = 1;
    @Input() public circuloTimerStroke: string = '#DCDCDC';
    @Input() public circuloTimerStrokeWidth: number = 4;
    public circuloFundoCoordenadas: string = '';
    public circuloTimerCoordenadas: string = '';
    private _coordenadas: Array<string> = [];
    private _dataInicial: number = new Date().getTime();
    private _segundosPassados: number = 0;

    constructor(private _themeService: ThemeService) {
        this._renderizarTimer();
    }

    ngOnInit(): void {
        this.circuloTimerStroke = this._corTemaPadrao();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.svgSize || changes.tempo) {
            this._renderizarTimer();
        }
    }

    private _corTemaPadrao(): string {
        if (this._themeService.getTheme()?.corPadrao) return this._themeService.getTheme()?.corPadrao!;
        return '#ffffff';
    }

    private _renderizarTimer() {
        const xyCentroTimer = this.svgSize / 2;
        const raio = this.svgSize / 2 - this.circuloTimerStrokeWidth * 2;

        const { x: x0, y: y0 } = this._calculaCoordenadas(0, raio, xyCentroTimer);

        this._coordenadas = [`M ${x0} ${y0}`];

        for (let grau = 1; grau <= 360; grau++) {
            const { x, y } = this._calculaCoordenadas(grau, raio, xyCentroTimer);

            this._coordenadas.push(`L ${x} ${y}`);
        }

        this.circuloFundoCoordenadas = this._coordenadas.join(' ');
        this.circuloTimerCoordenadas = '';
    }

    public iniciarContagem() {
        this._dataInicial = new Date().getTime();
        this._segundosPassados = 0;

        this._processarContagemRegressiva();
    }

    private _processarContagemRegressiva() {
        // Porcentagem do tempo que passou
        const porcentagem = this._segundosPassados / this.tempoSegundos;

        this._segundosPassados = (new Date().getTime() - this._dataInicial) / 1000;

        const novasCoordenadas = this._coordenadas.slice(0, porcentagem * this._coordenadas.length).join(' ');

        this.circuloTimerCoordenadas = novasCoordenadas;

        // Esta condição determina se o timer já foi finalizado
        if (this._segundosPassados > this.tempoSegundos) {
            this.circuloTimerCoordenadas = this._coordenadas.join(' ');
            return;
        }

        // O método é chamado novamente para processar o progresso do timer
        setTimeout(this._processarContagemRegressiva.bind(this), 250);
    }

    private _calculaCoordenadas(graus: number, raio: number, xyCentroCirculo: number): { x: number; y: number } {
        const radiano = graus * (Math.PI / 180);

        return {
            x: xyCentroCirculo + Math.sin(radiano) * raio,
            y: xyCentroCirculo - Math.cos(radiano) * raio
        };
    }
}
