import { Component, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/models/beneficiario/beneficiario.model';
import { BeneficiarioService } from 'src/app/services/beneficiario/beneficiario.service';



@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
})
export class BeneficiarioComponent implements OnInit {
  beneficiarios: Beneficiario[];

  constructor(private beneficiarioService: BeneficiarioService) {}

  ngOnInit(): void {
    this.loadBeneficiarios();
  }

  loadBeneficiarios(): void {
    this.beneficiarioService.getBeneficiarios().subscribe((data: Beneficiario[]) => {
      this.beneficiarios = data;
    });
  }
}
