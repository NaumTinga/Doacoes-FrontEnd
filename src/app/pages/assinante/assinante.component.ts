import {Component, OnInit} from "@angular/core";
import {Assinante} from "../../models/assinante/assinante";
import {AssinanteService} from "../../services/assinante/assinante.service";

@Component({
  selector: "app-assinante",
  templateUrl: "./assinante.component.html",
})
export class AssinanteComponent implements OnInit{

  assinantes: Assinante[] = [];

  constructor(private assinanteService: AssinanteService) {}
  ngOnInit() {
    this.loadAssinantes();

  }

  loadAssinantes(){
    this.assinanteService.getAssinantes().subscribe((data) => {
      this.assinantes = data;
    })
  }
}
