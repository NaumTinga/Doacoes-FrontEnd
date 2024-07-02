import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BancoService } from "../../services/banco/banco.service";
import { Banco } from "../../models/banco/banco.model";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persist-banco',
  templateUrl: './persist.banco.component.html',
})
export class PersistBancoComponent implements OnInit {
  banco: Banco = new Banco();
  isEdit: boolean = false;

  constructor(
    private bancoService: BancoService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(): void {

    // This is to fill the fields with the previous banco data when we want to update
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bancoService.getBancoById(+id).subscribe((data: Banco) => {
        this.banco = data;
      });
    }
  }

  saveBanco() {
    if (this.isEdit) {
      this.bancoService.updateBanco(this.banco).subscribe(() => {
        //Swal.fire to open Sweet Alert notification when the user updates banco or saves
        Swal.fire({
          title: 'Sucesso',
          text: 'Banco Actualizado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/banco']);
        });
      });
    } else {
      this.bancoService.createBanco(this.banco).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Banco Adicionado!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/banco']);
        });
      });
    }
  }
}
