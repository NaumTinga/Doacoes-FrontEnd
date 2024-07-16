import {Component, OnInit} from "@angular/core";
import {Cambio} from "../../models/cambio/cambio";
import {CambioService} from "../../services/cambio/cambio.service";
import {Moeda} from "../../models/moeda/moeda";
import {MoedaService} from "../../services/moeda/moeda.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {Pais} from "../../models/pais/pais";


@Component({
  selector: "app-perisist-cambio",
  templateUrl: "./perisist.cambio.component.html",
})

export class PersistCambioComponent implements OnInit {

  cambio: Cambio = new Cambio();
  moedas: Moeda[] = [];
  isEdit: boolean = false;
  isLoaded: boolean = false;

  constructor(private cambioService: CambioService,
              private moedaService: MoedaService,
              private router: Router,
              private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.listMoedas();
    // Check if the route contains an ID to determine if it's edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cambioService.getCambioById(+id).subscribe((data: Cambio) => {
        this.cambio = data;
        this.isLoaded = true; // Set isLoaded after cambio data is fetched
      });
    }
  }


  listMoedas(): void {
    this.moedaService.getMoeda().subscribe((data: Moeda[]) => {
      this.moedas = data;
      // If editing, ensure form is populated with correct data
      if (this.isEdit && this.isLoaded) {
        this.cambio.moeda_base = this.cambio.moeda_base.id;
        this.cambio.moeda_alvo = this.cambio.moeda_alvo.id;
      }
    });
  }

  saveCambio(): void {
    if (this.cambio.moeda_base === this.cambio.moeda_alvo) {
      Swal.fire({
        title: 'Aviso',
        text: 'A Moeda Origem e Moeda Destino não podem ser iguais!',
        icon: 'warning',
        confirmButtonText: 'OK',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-warning'
        }
      });
    } else {
      if (this.isEdit) {
        this.cambioService.updateCambio(this.cambio).subscribe(() => {
            Swal.fire({
              title: 'Sucesso',
              text: 'Câmbio Actualizado!',
              icon: 'success',
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-success'
              }
            }).then(() => {
              this.router.navigate(['/cambio']);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Erro',
              text: 'Erro ao actualizar câmbio.' +
                'Contacte o Administrador',
              icon: 'error',
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-danger'
              }
            });
          });
      } else {
        this.cambioService.saveCambio(this.cambio).subscribe(() => {
            Swal.fire({
              title: 'Sucesso',
              text: 'Câmbio Adicionado!',
              icon: 'success',
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-success'
              }
            }).then(() => {
              this.router.navigate(['/cambio']);
            });
          },
          (error) => {
            Swal.fire({
              title: 'Erro',
              text: 'Erro ao adicionar câmbio.' +
                'Contacte o Administrador',
              icon: 'error',
              confirmButtonText: 'OK',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-danger'
              }
            });
          });
      }
    }
  }
}
