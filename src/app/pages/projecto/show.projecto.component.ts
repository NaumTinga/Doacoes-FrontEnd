import {Component, OnInit} from "@angular/core";
import {Projecto} from "../../models/projecto/projecto";
import {ProjectoService} from "../../services/projecto/projecto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RubricaProjecto} from "../../models/rubricaProjecto/rubricaProjecto";
import {RubricaProjectoService} from "../../services/rubricaProjecto/rubricaProjecto.service";
import Swal from "sweetalert2";
import {Conta} from "../../models/conta/conta";

@Component({
  selector: 'app-show-projecto',
  templateUrl: './show.projecto.component.html',
  styles: [`
    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label-active {
      color: red;
      background-color: green;
    }

    ::ng-deep .mat-tab-list .mat-tab-labels {
      color: blue;
      background-color: #fafaf6;
    }

    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label {
      margin-right: 8px;
      border-radius: 4px;
    }

    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label-active {
      background-color: #28a745; /* Success color for active tab */
      color: #fff; /* White text color for active tab */
    }

    ::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label:hover {
      background-color: #e2e6ea; /* Light hover background */
      color: #495057; /* Dark text color on hover */
    }
  `],
})

export class ShowProjectoComponent implements OnInit {

  projecto: Projecto;
  rubricaProjecto: RubricaProjecto = new RubricaProjecto();
  rubricaProjectos: RubricaProjecto[];
  isEdit: boolean = false;

  constructor(private projectoService: ProjectoService,
              private rubricaProjectoService: RubricaProjectoService,
              private router: Router,
              private route: ActivatedRoute,) {
  }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProjecto(id);
    this.getRubricasProjecto(id);
  }

  getProjecto(id:number): void {
    this.projectoService.getProjectoById(id).subscribe(
      (data: Projecto) => {
        this.projecto = data;
        console.log(data);
      }
    )
  }

  getRubricasProjecto(id:number): void {
    this.projectoService.getRubricasProjecto(id).subscribe(
      (data: RubricaProjecto[]) => {
        this.rubricaProjectos = data;
      }
    )
  }


  saveRubricaProjecto(){
    this.rubricaProjecto.projecto = this.projecto.id;  // Automatically set the projecto
    if (this.isEdit){
      this.rubricaProjectoService.updateRubricaProjecto(this.rubricaProjecto).subscribe(() =>{
        Swal.fire({
          title: 'Sucesso',
          text: 'Rubrica do Projecto Actualizada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/view-projecto', this.projecto.id]);
        });
      })
    }else {
      this.rubricaProjectoService.saveRubricaProjecto(this.rubricaProjecto).subscribe(() => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Rubrica do Projecto Adicionada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.refreshPage();
        });
        }
      );
    }
  }

  refreshPage() {
    this.router.navigate([this.router.url]);
  }

}
