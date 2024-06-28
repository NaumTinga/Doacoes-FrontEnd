import {Component, OnInit} from "@angular/core";
import {Moeda} from "../../models/moeda/moeda";
import {MoedaService} from "../../services/moeda/moeda.service";

@Component({
  selector: 'app-moeda',
  templateUrl: './moeda.component.html',
})

export class MoedaComponent implements OnInit {
  moedas: Moeda[];

  constructor(private moedaService: MoedaService) {
  }

  ngOnInit() {
    this.loadMoedas()
  }

  loadMoedas(): void{
    this.moedaService.getMoeda().subscribe((data: Moeda[]) => {
      this.moedas = data;
    })
  }

}
