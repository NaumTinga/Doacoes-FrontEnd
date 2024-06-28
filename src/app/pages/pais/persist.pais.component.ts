import {Component, OnInit} from "@angular/core";
import {Pais} from "../../models/pais/pais";
import {PaisService} from "../../services/pais/pais.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: 'app-persist-pais',
  templateUrl: './persist.pais.component.html',
})

export class PersistPaisComponent implements OnInit {

  pais: Pais = new Pais();
  isEdit: boolean = false;

  constructor(private paisService: PaisService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.paisService.getPaisById(+id).subscribe((data: Pais) => {
        this.pais = data;
      })
    }
  }

  savePais(){
    if(this.isEdit){
      this.paisService.updatePais(this.pais).subscribe(() => {
        //Swal.fire to open Sweet Alert notification when the user updates banco or saves
        Swal.fire({
          title: 'Sucesso',
          text: 'País Actualizado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/pais']);
        });
      });
    } else {
      this.paisService.savePais(this.pais).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'País Adicionado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/pais']);
        });
      });
    }
    }
}
