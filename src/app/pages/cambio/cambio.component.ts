import {Component, OnInit} from "@angular/core";
import {CambioService} from "../../services/cambio/cambio.service";
import {MoedaService} from "../../services/moeda/moeda.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Cambio} from "src/app/models/cambio/cambio";

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.component.html',
})

export class CambioComponent implements OnInit {

  cambios: Cambio [];


  constructor(private cambioService: CambioService,
              private moedaService: MoedaService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.loadCambios();
  }


  loadCambios(): void {
    this.cambioService.getCambios().subscribe((data: Cambio[]) => {
      this.cambios = data;
      console.log("Cambio: ", this.cambios)
    })
  }


}
