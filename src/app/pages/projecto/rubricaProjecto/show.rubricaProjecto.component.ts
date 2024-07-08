import {Component, OnInit} from "@angular/core";
import {RubricaProjecto} from "../../../models/rubricaProjecto/rubricaProjecto";
import {RubricaProjectoService} from "../../../services/rubricaProjecto/rubricaProjecto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubRubricaService} from "../../../services/subRubrica/subRubrica.service";
import {SubRubrica} from "../../../models/subRubrica/subRubrica";
import Swal from "sweetalert2";

@Component({
  selector: 'app-how-rubricaProjecto',
  templateUrl: './show.rubricaProjecto.component.html',
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


export class ShowRubricaProjectoComponent implements OnInit {

  rubricaProjecto: RubricaProjecto;
  subRubrica: SubRubrica = new SubRubrica();
  subRubricas: SubRubrica[];
  isEdit: boolean = false;

  constructor(private rubricaProjectoService: RubricaProjectoService,
              private subRubricaService: SubRubricaService,
              private router: Router,
              private route: ActivatedRoute,){
  }


  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getRubricaProjecto(id);
    this.getSubRubricas();
  }

  getRubricaProjecto(id:number) {
    this.rubricaProjectoService.getRubricaProjectoById(id).subscribe(
      (data: RubricaProjecto) => {
        this.rubricaProjecto = data;
      }
    )
  }

  getSubRubricas(){
    return this.subRubricaService.getSubRubricas().subscribe((data: SubRubrica[]) => {
      this.subRubricas = data;
    });
  }

  saveSubRubrica(): void {
    this.subRubrica.rubrica_projecto = this.rubricaProjecto.id;
    if (this.isEdit){
      this.subRubricaService.updateSubRubrica(this.subRubrica).subscribe(() =>{
        Swal.fire({
          title: 'Sucesso',
          text: 'Sub Rubrica Actualizada!',
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        }).then(() => {
          this.router.navigate(['/view-rubricaProjecto', this.rubricaProjecto.id]);
        });
      })
    } else {
      this.subRubricaService.saveSubRubrica(this.subRubrica).subscribe(() => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Sub Rubrica Adicionada!',
            icon: 'success',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(() => {
            this.router.navigate(['/view-rubricaProjecto', this.rubricaProjecto.id]);
          });
        }
      );
    }
  }

}
