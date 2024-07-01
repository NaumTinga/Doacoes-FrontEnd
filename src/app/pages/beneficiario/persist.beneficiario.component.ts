import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiarioService } from "../../services/beneficiario/beneficiario.service";
import {Beneficiario, NivelAcademico, Sexo} from "../../models/beneficiario/beneficiario.model";
import Swal from 'sweetalert2';
import {UnidadeOrganica} from "../../models/unidadeOrganica/unidadeOrganica";
import {UnidadeOrganicaService} from "../../services/unidadeOrganica/unidadeOrganica.service";

@Component({
  selector: 'app-persist-beneficiario',
  templateUrl: './persist.beneficiario.component.html',
})
export class PersistBeneficiarioComponent implements OnInit {
  beneficiario: Beneficiario = new Beneficiario();
  unidadeOrganicas: UnidadeOrganica[];
  sexoOptions = Object.values(Sexo);
  nivelAcademicoOptions = Object.values(NivelAcademico);
  isEdit: boolean = false;
  serverErrors: any = {};

  constructor(
    private beneficiarioService: BeneficiarioService,
    private unidadeOrganicaService: UnidadeOrganicaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // This is to fill the fields with the previous beneficiario data when we want to update
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.beneficiarioService.getBeneficiarioById(+id).subscribe((data: Beneficiario) => {
        this.beneficiario = data;
      });
    }

    // Fetch list of unidades organicas
    this.unidadeOrganicaService.getUnidadeOrganicas().subscribe((data: UnidadeOrganica[]) => {
      this.unidadeOrganicas = data;
    })
  }

  saveBeneficiario() {
    //console.log(this.beneficiario);
    this.serverErrors = {};

    if (this.isEdit) {
      this.beneficiarioService.updateBeneficiario(this.beneficiario).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Beneficiario Actualizado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/beneficiario']);
          });
        },
        (error) => {
          console.error('Error updating beneficiario:', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao actualizar beneficiario.',
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
      this.beneficiarioService.createBeneficiario(this.beneficiario).subscribe(
        () => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Beneficiario Adicionado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/beneficiario']);
          });
        },
        (error) => {
          console.error('Error creating beneficiario:', this.serverErrors = error);
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao adicionar beneficiario.',
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
