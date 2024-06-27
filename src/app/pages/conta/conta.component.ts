import {Component, OnInit} from "@angular/core";
import {Conta} from "../../models/conta/conta";


@Component({
  selector: "app-conta",
  templateUrl: "./conta.component.html",
})

export class ContaComponent implements OnInit {
  contas: Conta[];

  ngOnInit() {

  }
}
