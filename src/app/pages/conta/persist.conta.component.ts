import {Component, OnInit} from "@angular/core";
import {Conta} from "../../models/conta/conta";
import {ContaService} from "../../services/conta/conta.service";
import {MoedaService} from "../../services/moeda/moeda.service";
import {BancoService} from "../../services/banco/banco.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Banco} from "../../models/banco/banco.model";
import {Moeda} from "../../models/moeda/moeda";
import Swal from "sweetalert2";
import {Beneficiario} from "../../models/beneficiario/beneficiario.model";
import {Actividade} from "../../models/actividade/actividade.model";
import {Financiador} from "../../models/financiador/financiador";
import {BeneficiarioService} from "../../services/beneficiario/beneficiario.service";
import {FinanciadorService} from "../../services/financiador/financiador.service";
import {ActividadeService} from "../../services/actividade/actividade.service";

@Component({
  selector: "app-persist",
  templateUrl: "./persist.conta.component.html",
})

export class PersistContaComponent implements OnInit{

  conta: Conta = new Conta();
  bancos: Banco[];
  moedas: Moeda[];
  beneficiarios: Beneficiario[];
  financiadores: Financiador[];
  actividades: Actividade[];
  isEdit: boolean = false;
  selectedTipo: string;

  constructor(private contaService: ContaService,
              private moedaService: MoedaService,
              private bancoService: BancoService,
              private beneficiarioService: BeneficiarioService,
              private financiadorService: FinanciadorService,
              private actividadeService: ActividadeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // This is to fill the fields with the previous Conta data when we want to update
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.contaService.getContaById(+id).subscribe((data: Conta) => {
        this.conta = data;
      })
    }

    //Fetches List of Bancos
    this.bancoService.getBancos().subscribe((data: Banco[]) => {
      this.bancos = data;
    })
    // Fetch List of Moedas
    this.moedaService.getMoeda().subscribe((data: Moeda[]) => {
      this.moedas = data;
    })

    //Fetches List of Beneficiarios
    this.beneficiarioService.getBeneficiarios().subscribe((data: Beneficiario[]) => {
      this.beneficiarios = data;
    })

    //Fetches List of Financiadore
    this.financiadorService.getFinanciadores().subscribe((data: Financiador[]) => {
      this.financiadores = data;
    })

    //Fetches List of Actividades
    this.actividadeService.getActividades().subscribe((data: Actividade[]) => {
      this.actividades = data;
    })

  }

  onTipoChange(tipo: string) {
    this.selectedTipo = tipo;
  }

  onContaCentralChange(isChecked: boolean) {
    this.conta.conta_central = isChecked;
    if (isChecked) {
      this.selectedTipo = ''; // Clear the selected type if "Conta Central" is checked
    }
  }

  saveConta(): void {
    if (this.isEdit) {
      this.contaService.updateConta(this.conta).subscribe(() =>{
        Swal.fire({
          title: 'Sucesso',
          text: 'Conta Actualizada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() =>{
          this.router.navigate(['/conta']);
        })
      })
    } else {
      this.contaService.saveConta(this.conta).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Conta Adicionada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/conta']);
        });
      });
    }
  }
}
