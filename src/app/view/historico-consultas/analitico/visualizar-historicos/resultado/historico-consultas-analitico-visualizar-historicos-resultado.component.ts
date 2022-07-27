import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-historico-consultas-analitico-visualizar-historicos-resultado',
  templateUrl: './historico-consultas-analitico-visualizar-historicos-resultado.component.html',
  styleUrls: ['./historico-consultas-analitico-visualizar-historicos-resultado.component.scss']
})
export class HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent {

  value!: string;
  title!: string;
  isJson!: boolean;

  constructor(
    @Optional() public dialogRef: MatDialogRef<HistoricoConsultasAnaliticoVisualizarHistoricosResultadoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data != null) {
        this.title = data.title;
        this.value = this.getValue(data.value);
      }      
    }

  getValue(dados: any) {
    try {
      var json = JSON.parse(dados);
      this.isJson = true;
      return json;
    }
    catch {
      this.isJson = false;
      return dados;
    }
  }

}
