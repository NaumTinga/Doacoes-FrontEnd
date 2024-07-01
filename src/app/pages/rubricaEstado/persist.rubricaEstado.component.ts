import {Component, OnInit} from "@angular/core";
import {RubricaEstado, TipoRubrica} from "../../models/rubricaEstado/rubricaEstado";
import {RubricaEstadoService} from "../../services/rubricaEstado/rubricaEstado.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-persist.rubricaEstado',
  templateUrl: './persist.rubricaEstado.component.html',
})

export class PersistRubricaEstadoComponent implements OnInit{

  rubricaEstado: RubricaEstado = new RubricaEstado();
  tipoRubricaOptions = Object.values(TipoRubrica);
  isEdit = false;

  constructor(private rubricaEstadoService: RubricaEstadoService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.rubricaEstadoService.getRubricaEstadoById(+id).subscribe((data: RubricaEstado) => {
        this.rubricaEstado = data;
      })
    }
  }

  saveRubricaEstado(){
    if (this.isEdit){
      this.rubricaEstadoService.updateRubricaEstado(this.rubricaEstado).subscribe(() => {
        //Swal.fire to open Sweet Alert notification when the user updates banco or saves
        Swal.fire({
          title: 'Sucesso',
          text: 'Rubrica do Estado Actualizada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/rubricaEstado']);
        });
      });
    } else {
      this.rubricaEstadoService.saveRubricaEstado(this.rubricaEstado).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Rubrica do Estado Adicionada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/rubricaEstado']);
        });
      });
    }
  }

}
