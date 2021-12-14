import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  formConsulta!: FormGroup;

  searchResult: any;
  displayedColumns: string[] = ['codigo', 'email', 'editar', 'excluir'];

  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _formBuilder: FormBuilder) {
    this.formConsulta = this._formBuilder.group({
      email: ['']
    });
  }

  ngOnInit(): void {
  }

  search() {
    console.log('pesquisar');
    this.searchResult = [
      {
        codigo: "001",
        email: "teste@teste.com"
      },
      {
        codigo: "002",
        email: "teste2@teste.com"
      },
      {
        codigo: "003",
        email: "teste3@teste.com"
      }
    ]
    return this.searchResult;
  }

  cleanFilter() {
    console.log('limpar');
  }

  edit(element: any) {
    console.log('editar');
    console.log(element);
  }

  delete(element: any) {
    console.log('excluir');
    console.log(element);
  }

  handleNextStep() {
    this.nextStep.emit();
  }
}
