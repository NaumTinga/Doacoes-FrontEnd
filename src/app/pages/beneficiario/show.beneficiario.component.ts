import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Beneficiario} from "../../models/beneficiario/beneficiario.model";
import {ActivatedRoute} from "@angular/router";
import {BeneficiarioService} from "../../services/beneficiario/beneficiario.service";
import {Conta} from "../../models/conta/conta";

@Component({
  selector: "app-show-beneficiario",
  styles: [`::ng-deep .mat-tab-list .mat-tab-labels .mat-tab-label-active {
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
  templateUrl: "./show.beneficiario.component.html",
})

export class ShowBeneficiarioComponent implements OnInit{

  beneficiario: Beneficiario;
  contas: Conta[];

  constructor(private route: ActivatedRoute,
              private beneficiarioService: BeneficiarioService,){}
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getBeneficiario(id);
    this.getBeneficiarioContas(id);
  }

  getBeneficiario(id: number): void {
    this.beneficiarioService.getBeneficiarioById(id).subscribe(
      (data: Beneficiario) => {
        this.beneficiario = data;
      },
      error => {
        console.error('Error fetching beneficiario data', error);
      }
    );
  }

  getBeneficiarioContas(id: number): void {
    this.beneficiarioService.getBeneficiarioContas(id).subscribe(
      (data: Conta[]) => {
        this.contas = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching beneficiario accounts', error);
      }
    );
  }

}
