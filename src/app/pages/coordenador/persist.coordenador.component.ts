import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoordenadorService} from "../../services/coordenador/coordenador.service";
import {Coordenador} from "../../models/coordenador/coordenador.model";
import Swal from 'sweetalert2';
import {UnidadeOrganicaService} from "../../services/unidadeOrganica/unidadeOrganica.service";
import {UnidadeOrganica} from "../../models/unidadeOrganica/unidadeOrganica";
import {error} from "protractor";
import {SexoEnum} from "../../models/enums/sexo.enum";
import {NivelAcademicoEnum} from "../../models/enums/nivelAcademico.enum";

@Component({
  selector: 'app-persist-coordenador',
  templateUrl: './persist.coordenador.component.html',
})
export class PersistCoordenadorComponent implements OnInit {
  coordenador: Coordenador = new Coordenador();
  unidadeOrganicas: UnidadeOrganica[];
  sexoOptions = Object.values(SexoEnum);
  nivelAcademicoOptions = Object.values(NivelAcademicoEnum);
  isEdit: boolean = false;
  serverErrors: any = {};

  constructor(
    private coordenadorService: CoordenadorService,
    private unidadeOrganicaService: UnidadeOrganicaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    // This is to fill the fields with the previous coordenador data when we want to update
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.coordenadorService.getCoordenadorById(+id).subscribe((data: Coordenador) => {
        this.coordenador = data;
      });
    }

    this.unidadeOrganicaService.getUnidadeOrganicas().subscribe((data: UnidadeOrganica[]) => {
      this.unidadeOrganicas = data;
    })
  }

  saveCoordenador() {
    this.serverErrors = {};

    if (this.isEdit) {
      this.coordenadorService.updateCoordenador(this.coordenador).subscribe(() => {
          //Swal.fire to open Sweet Alert notification when the user updates coordenador or saves
          Swal.fire({
            title: 'Sucesso',
            text: 'Coordenador Actualizado!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/coordenador']);
          });
        },
        (error) => {
          console.error('Error updating coordenador');
          Swal.fire({
            title: 'Erro',
            text: 'Erro ao actualizar coordenador.',
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/coordenador']);
          });
        }
      );
    } else {
      this.coordenadorService.createCoordenador(this.coordenador).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Coordenador Adicionado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/coordenador']);
        });
      }, (error) => {
        console.error('Error creating coordenador');
        Swal.fire({
          title: 'Erro',
          text: 'Erro ao actualizar coordenador.',
          icon: 'error',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        }
      );
    }
  }
}
