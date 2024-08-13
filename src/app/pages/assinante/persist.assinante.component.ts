import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AssinanteService} from "../../services/assinante/assinante.service";
import {Assinante} from "../../models/assinante/assinante";
import Swal from "sweetalert2";
import {TipoAssinanteEnum} from "../../models/enums/tipoAssinante.enum";

@Component({
  selector: 'app-persist-assinante',
  templateUrl: './persist.assinante.component.html',
})
export class PersistAssinanteComponent implements OnInit {

  assinante: Assinante = new Assinante();
  assinanteOptions = Object.values(TipoAssinanteEnum);
  isEdit: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private assinanteService: AssinanteService)   {
  }
  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.assinanteService.getAssinanteById(+id).subscribe((data: Assinante) => {
        this.assinante = data;
      });
    }
  }

  save() {
    if (this.isEdit) {
      this.assinanteService.update(this.assinante).subscribe(() => {
        //Swal.fire to open Sweet Alert notification when the user updates actividade or saves
        Swal.fire({
          title: 'Sucesso',
          text: 'Assinante Actualizado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/assinante']);
        });
      });
    } else {
      this.assinanteService.save(this.assinante).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Assinante Adicionado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/assinante']);
        });
      });
    }
  }
}
