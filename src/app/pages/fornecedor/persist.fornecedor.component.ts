import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Fornecedor} from "../../models/fornecedor/fornecedor";
import {Pais} from "../../models/pais/pais";
import {FornecedorService} from "../../services/fornecedor/fornecedor.service";
import {PaisService} from "../../services/pais/pais.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-persist-fornecedor",
  templateUrl: "./persist.fornecedor.component.html",
})

export class PersistFornecedorComponent implements OnInit {

  fornecedor: Fornecedor = new Fornecedor();
  paises: Pais[];
  isEdit: boolean = false;
  serverErrors: any = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fornecedorService: FornecedorService,
              private paisService: PaisService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.fornecedorService.getFornecedorById(+id).subscribe((data: Fornecedor) => {
        this.fornecedor = data;
      })
    }

    this.loadPaises();
  }

  loadPaises(){
    this.paisService.getPaises().subscribe((data) => {
      this.paises = data;
    })
  }

  saveFornecedor(){
    this.serverErrors = {};

    if (this.isEdit) {
      this.fornecedorService.updateFornecedor(this.fornecedor).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Fornecedor Actualizado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/fornecedor']);
          });
        },
        (error) => {
          console.error('Error updating fornecedor:', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao actualizar fornecedor.',
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
      this.fornecedorService.saveFornecedor(this.fornecedor).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Fornecedor Adicionado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/fornecedor']);
          });
        },
        (error) => {
          console.error('Error creating fornecedor:', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao adicionar fornecedor.',
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
