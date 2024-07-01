import {Component, OnInit} from "@angular/core";
import {UnidadeOrganica} from "../../models/unidadeOrganica/unidadeOrganica";
import {UnidadeOrganicaService} from "../../services/unidadeOrganica/unidadeOrganica.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: "app-persist-unidadeOrganica",
  templateUrl: "./persist.unidadeOrganica.component.html",
})

export class PersistUnidadeOrganicaComponent implements OnInit {
  unidadeOrganica: UnidadeOrganica = new UnidadeOrganica();
  isEdit: boolean = false;

  constructor(private unidadeOrganicaService: UnidadeOrganicaService,
              private router: Router,
              private route: ActivatedRoute,) {
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.unidadeOrganicaService.getUnidadeOrganicaById(+id).subscribe((data: UnidadeOrganica) => {
        this.unidadeOrganica = data;
      })
    }
  }

  saveUnidadeOrganica(){
    if (this.isEdit){
      this.unidadeOrganicaService.updateUnidadeOrganica(this.unidadeOrganica).subscribe(() =>{
        Swal.fire({
          title: 'Sucesso',
          text: 'Unidade Orgânica Actualizada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/unidadeOrganica']);
        });
      });
    } else {
      this.unidadeOrganicaService.saveUnidadeOrganica(this.unidadeOrganica).subscribe(() =>{
        Swal.fire({
          title: 'Sucesso',
          text: 'Unidade Orgânica Adicionada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/unidadeOrganica']);
        })
      })
    }
  }
}
