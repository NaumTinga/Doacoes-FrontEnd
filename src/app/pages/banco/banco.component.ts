import { Component, OnInit } from '@angular/core';
import {BancoService} from "../../services/banco/banco.service";
import {Banco} from "../../models/banco/banco.model";


@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
})
export class BancoComponent implements OnInit {
  bancos: Banco[];

  constructor(private bancoService: BancoService) {}

  ngOnInit(): void {
    this.loadBancos();
  }

  loadBancos(): void {
    this.bancoService.getBancos().subscribe((data: Banco[]) => {
      this.bancos = data;
    });
  }
}
