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

@Component({
  selector: "app-persist",
  templateUrl: "./persist.conta.component.html",
})

export class PersistContaComponent implements OnInit{

  conta: Conta = new Conta();
  bancos: Banco[];
  moedas: Moeda[];
  beneficiarios: Beneficiario[];
  actividades: Actividade[];
  isEdit: boolean = false;

  constructor(private contaService: ContaService,
              private moedaService: MoedaService,
              private bancoService: BancoService,
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
