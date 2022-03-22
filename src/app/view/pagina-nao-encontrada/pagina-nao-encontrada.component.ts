import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TimerComponent } from 'src/app/shared/components/timer/timer.component';

@Component({
    selector: 'app-pagina-nao-encontrada',
    templateUrl: './pagina-nao-encontrada.component.html',
    styleUrls: ['./pagina-nao-encontrada.component.scss']
})
export class PaginaNaoEncontradaComponent implements AfterViewInit, OnDestroy {
    @ViewChild('timer') private _timer!: TimerComponent;
    public valorContador: number = 10;
    public contador: number = this.valorContador;
    private interval!: any;

    constructor(private _router: Router) {}

    ngAfterViewInit(): void {
        this.iniciaContador();
    }

    ngOnDestroy(): void {
        this.clearInterval();
    }

    public goBack() {
        this._router.navigate(['processos-judiciais/consulta-geral']);
    }

    private iniciaContador() {
        this._timer.iniciarContagem();
        this.interval = setInterval(() => {
            if (this.contador > 0) this.contador--;

            if (this.contador == 0) {
                this.clearInterval();
                this.goBack();
            }
        }, 1000);
    }

    private clearInterval() {
        clearInterval(this.interval);
    }
}
