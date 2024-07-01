import {Component, OnInit} from "@angular/core";
import Swal from "sweetalert2";
import {FinanciadorService} from "../../services/financiador/financiador.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Financiador} from "../../models/financiador/financiador";
import {Pais} from "../../models/pais/pais";
import {PaisService} from "../../services/pais/pais.service";

@Component({
  selector: 'app-persist-financiador',
  templateUrl: './persist.financiador.component.html',
})

export class PersistFinanciadorComponent implements OnInit {

  financiador: Financiador = new Financiador();
  paises: Pais[];
  isEdit: boolean = false;
  serverErrors: any = {};

  constructor(private financiadorService: FinanciadorService,
              private paisService: PaisService,
              private route: ActivatedRoute,
              private router: Router) {

  }
  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.financiadorService.getFinanciadorById(+id).subscribe((data: Financiador) => {
        this.financiador = data;
      })
    }

    // Fetch list of Paises
    this.paisService.getPaises().subscribe((data: Pais[]) => {
      this.paises = data;
    })
  }

  saveFinanciador() {
    this.serverErrors = {};

    if (this.isEdit) {
      this.financiadorService.updateFinanciador(this.financiador).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Financiador Actualizado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/financiador']);
          });
        },
        (error) => {
          console.error('Error updating financiador:', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao actualizar financiador.',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
        }
      );
    } else {
      this.financiadorService.saveFinanciador(this.financiador).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Financiador Adicionado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/financiador']);
          });
        },
        (error) => {
          console.error('Error creating financiador:', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao adicionar financiador.',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
        }
      );
    }
  }
}
