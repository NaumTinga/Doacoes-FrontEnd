import { Component, OnInit } from '@angular/core';
import { Financiador } from '../../models/financiador/financiador';
import { FinanciadorService } from '../../services/financiador/financiador.service';
import { ActivatedRoute } from '@angular/router';
import { Conta } from '../../models/conta/conta';
import {Financiamento} from "../../models/financiamento/financiamento";

@Component({
  selector: 'app-show-financiador',
  templateUrl: './show.financiador.component.html',
  styles: [`
    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label-active {
      color: red;
      background-color: green;
    }

    ::ng-deep .mat-tab-list .mat-tab-labels {
      color: blue;
      background-color: #fafaf6;
    }

    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label {
      margin-right: 8px;
      border-radius: 4px;
    }

    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label-active {
      background-color: #28a745; /* Success color for active tab */
      color: #fff; /* White text color for active tab */
    }

    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label:hover {
      background-color: #e2e6ea; /* Light hover background */
      color: #495057; /* Dark text color on hover */
    }
  `],
})
export class ShowFinanciadorComponent implements OnInit {

  financiador: Financiador;
  contas: Conta[];
  financiamentos: Financiamento[];

  constructor(private financiadorService: FinanciadorService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getFinanciador(id);
    this.getFinanciadorContas(id);
    this.getFinanciadorFinanciamentos(id);
  }

  getFinanciador(id: number): void {
    this.financiadorService.getFinanciadorById(id).subscribe(
      (data: Financiador) => {
        this.financiador = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching financiador data', error);
      }
    );
  }

  getFinanciadorContas(id: number): void {
    this.financiadorService.getFinanciadorContas(id).subscribe(
      (data: Conta[]) => {
        this.contas = data;
        console.log("Dados das Contas", data); // Verify the data structure
      },
      error => {
        console.error('Error fetching financiadorContas', error);
      }
    );
  }

  getFinanciadorFinanciamentos(id: number): void {
    this.financiadorService.getFinanciadorFinanciamentos(id).subscribe(
      (data: Financiamento[]) => {
        this.financiamentos = data;
      })
  }

}
