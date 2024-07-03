import {Component, OnInit} from "@angular/core";
import {Projecto} from "../../models/projecto/projecto";
import {Financiamento} from "../../models/financiamento/financiamento";
import {Coordenador} from "../../models/coordenador/coordenador.model";
import {ProjectoService} from "../../services/projecto/projecto.service";
import {FinanciamentoService} from "../../services/financiamento/financiamento.service";
import {CoordenadorService} from "../../services/coordenador/coordenador.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {error} from "protractor";

@Component({
  selector: 'app-persist-projecto',
  templateUrl: './persist.projecto.component.html',
})

export class PersistProjectoComponent implements OnInit {

  projecto: Projecto = new Projecto();
  financiamentos: Financiamento[];
  coordenadores: Coordenador[];
  selectedFinanciamento: Financiamento | null = null; // Add this line
  isEdit: boolean = false;
  serverErrors: any = {};

  constructor(private projectoService: ProjectoService,
              private financiamentoService: FinanciamentoService,
              private coordenadorService: CoordenadorService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectoService.getProjectoById(+id).subscribe((data: Projecto) => {
        this.projecto = data;
        if (this.projecto.financiamento) {
          this.loadFinanciamentoDetails(this.projecto.financiamento.id);
        }
      })
    }

    // Fetch list of Financiamentos
    this.financiamentoService.getFinanciamentos().subscribe((data: Financiamento[]) => {
      this.financiamentos = data;
    });

    // Fetch List of Coordenadores
    this.coordenadorService.getCoordenadores().subscribe((data: Coordenador[]) => {
      this.coordenadores = data;
    })
  }

  loadFinanciamentoDetails(financiamentoId: number): void {
    if (financiamentoId) {
      this.financiamentoService.getFinanciamentoById(financiamentoId).subscribe((data: Financiamento) => {
        this.selectedFinanciamento = data;
        console.log(this.selectedFinanciamento);
        console.log("Moeda: "+ " " + this.selectedFinanciamento.moeda_financiador.designacao);
        console.log("Silga moeda: "+ " "+this.projecto.financiamento.moeda_financiador.sigla);
      });
    } else {
      this.selectedFinanciamento = null;
    }
  }


  compareFinanciamentoAndProjecto(): boolean {
    if (this.selectedFinanciamento) {
      if (this.projecto.valor >= this.selectedFinanciamento.valor) {
        Swal.fire({
          title: 'Aviso',
          text: 'O valor do projecto não pode ser maior que o valor do financiamento!',
          icon: 'warning',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-warning'
          }
        });
        return false;
      }
      if (new Date(this.projecto.data_inicio) < new Date(this.selectedFinanciamento.data_inicio) ||
        new Date(this.projecto.data_inicio) > new Date(this.selectedFinanciamento.data_fim)) {
        Swal.fire({
          title: 'Aviso',
          text: 'A data de início do projecto não pode ser inferior à data de início do financiamento ' +
            'e também não pode ser superior a data fim do financiamento!',
          icon: 'warning',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-warning'
          }
        });
        return false;
      }
      if (new Date(this.projecto.data_fim) > new Date(this.selectedFinanciamento.data_fim) ||
        new Date(this.projecto.data_fim) < new Date(this.selectedFinanciamento.data_inicio) ) {
        Swal.fire({
          title: 'Aviso',
          text: 'A data de fim do projecto não pode ser superior à data de fim do financiamento ' +
            'e também não pode ser inferio a data início do financiamento!',
          icon: 'warning',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-warning'
          }
        });
        return false;
      }
      // Add more comparisons as needed

    }
    return true;
  }
  saveProjecto() {
    if (this.isEdit) {
      if (!this.compareFinanciamentoAndProjecto()) {
        return;
      } else{
        this.projectoService.updateProjecto(this.projecto).subscribe(
          () => {
            Swal.fire({
              title: 'Sucesso',
              text: 'Projecto Actualizado!',
              icon: 'success',
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-success'
              }
            }).then(() => {
              this.router.navigate(['/projecto']);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Erro ao Actualizar o Projecto!',
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

    } else {
      if (!this.compareFinanciamentoAndProjecto()) {
        return;
      } else{
        this.projectoService.saveProjecto(this.projecto).subscribe(
          () => {
            Swal.fire({
              title: 'Sucesso',
              text: 'Projecto Adicionado!',
              icon: 'success',
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-success'
              }
            }).then(() => {
              this.router.navigate(['/projecto']);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Erro ao Adicionar o Projecto!',
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

}
