import {Component, OnInit} from "@angular/core";
import {Financiamento} from "../../models/financiamento/financiamento";
import {Moeda} from "../../models/moeda/moeda";
import {FinanciamentoService} from "../../services/financiamento/financiamento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FinanciadorService} from "../../services/financiador/financiador.service";
import {MoedaService} from "../../services/moeda/moeda.service";
import {Financiador} from "../../models/financiador/financiador";
import Swal from "sweetalert2";
import {Conta} from "../../models/conta/conta";
import {ContaService} from "../../services/conta/conta.service";

@Component({
  selector: 'app-persist-financiamento',
  templateUrl: './persist.financiamento.component.html',
})

export class PersistFinanciamentoComponent implements OnInit {

  financiamento: Financiamento = new Financiamento();
  isEdit: boolean = false;
  moedas: Moeda[];
  financiadores: Financiador[];
  contas: Conta[];
  serverErrors: any = {}

  constructor(private financiamentoService: FinanciamentoService,
              private financiadorService: FinanciadorService,
              private moedaService: MoedaService,
              private contaService: ContaService,
              private route: ActivatedRoute,
              private router: Router,
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.financiamentoService.getFinanciamentoById(+id).subscribe((data: Financiamento) => {
        this.financiamento = data;
      })
    }

    this.financiadorService.getFinanciadores().subscribe((data: Financiador[]) => {
      this.financiadores = data;
    })

    this.moedaService.getMoeda().subscribe((data: Moeda[]) => {
      this.moedas = data;
    })

    this.contaService.getContas().subscribe((data: Conta[]) => {
      this.contas = data;
    })
  }


  saveFinanciamento() {
    this.serverErrors = {};

    if (this.isEdit) {
      this.financiamentoService.updateFinanciamento(this.financiamento).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Financiamento Actualizado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/financiamento']);
          });
        },
        (error) => {
          console.error('Erro ao actualizar Financiamento: ', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao actualizar Financiamento',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        }
      );
    } else {
      this.financiamentoService.saveFinanciamento(this.financiamento).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Financiamento Adicionado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/financiamento']);
          });
        },
        (error) => {
          console.error('Erro ao adicionar Financiamento: ', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao adicionar Financiamento',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        }
      );
    }
  }
}
