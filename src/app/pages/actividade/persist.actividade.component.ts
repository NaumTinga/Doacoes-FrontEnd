import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadeService } from "../../services/actividade/actividade.service";
import { Actividade } from "../../models/actividade/actividade.model";
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persist-actividade',
  templateUrl: './persist.actividade.component.html',
})
export class PersistActividadeComponent implements OnInit {
  actividade: Actividade = new Actividade();
  isEdit: boolean = false;

  constructor(
    private actividadeService: ActividadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // This is to fill the fields with the previous actividade data when we want to update
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.actividadeService.getActividadeById(+id).subscribe((data: Actividade) => {
        this.actividade = data;
      });
    }
  }

  saveActividade() {
    if (this.isEdit) {
      this.actividadeService.updateActividade(this.actividade).subscribe(() => {
        //Swal.fire to open Sweet Alert notification when the user updates actividade or saves
        Swal.fire({
          title: 'Sucesso',
          text: 'Actividade Actualizado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/actividade']);
        });
      });
    } else {
      this.actividadeService.createActividade(this.actividade).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Actividade Adicionado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/actividade']);
        });
      });
    }
  }
}
