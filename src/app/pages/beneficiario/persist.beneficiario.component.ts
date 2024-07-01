import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiarioService } from "../../services/beneficiario/beneficiario.service";
import { Beneficiario } from "../../models/beneficiario/beneficiario.model";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persist-beneficiario',
  templateUrl: './persist.beneficiario.component.html',
})
export class PersistBeneficiarioComponent implements OnInit {
  beneficiario: Beneficiario = new Beneficiario();
  isEdit: boolean = false;

  constructor(
    private beneficiarioService: BeneficiarioService,
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
  }

  saveBeneficiario() {
    if (this.isEdit) {
      this.beneficiarioService.updateBeneficiario(this.beneficiario).subscribe(() => {
        //Swal.fire to open Sweet Alert notification when the user updates beneficiario or saves
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
      });
    } else {
      this.beneficiarioService.createBeneficiario(this.beneficiario).subscribe(() => {
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
      });
    }
  }
}
