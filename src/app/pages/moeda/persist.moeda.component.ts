import {Component, OnInit} from "@angular/core";
import {MoedaService} from "../../services/moeda/moeda.service";
import {Moeda} from "../../models/moeda/moeda";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-persist',
  templateUrl: './persist.moeda.component.html',
})

export class PersistMoedaComponent implements OnInit{
  moeda: Moeda = new Moeda();
  isEdit: boolean = false;


  constructor(private moedaService: MoedaService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // This is to fill the fields with the previous moeda data when we want to update
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.moedaService.getMoedaById(+id).subscribe((data: Moeda) => {
        this.moeda = data;
      })
    }
  }

  saveMoeda(){
    if (this.isEdit){
      this.moedaService.updateMoeda(this.moeda).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Moeda Actualizada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/moeda']);
        })
      })
  } else {
      this.moedaService.saveMoeda(this.moeda).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Moeda Adicionada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/moeda']);
        })
      })
    }
  }
}
