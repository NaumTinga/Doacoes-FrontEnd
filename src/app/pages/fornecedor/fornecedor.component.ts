import {Component, OnInit} from "@angular/core";
import {Fornecedor} from "../../models/fornecedor/fornecedor";
import {FornecedorService} from "../../services/fornecedor/fornecedor.service";

@Component({
  selector: "app-fornecedor",
  templateUrl: "./fornecedor.component.html",
})

export class FornecedorComponent implements OnInit {

  fornecedores: Fornecedor[] = [];
  constructor(private fornecedorService: FornecedorService) {
  }

  ngOnInit() {
    this.fornecedorService.getFornecedores().subscribe(data => {
      this.fornecedores = data;
    })
  }
}
