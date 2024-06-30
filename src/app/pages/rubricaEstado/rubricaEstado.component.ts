import {Component, OnInit} from "@angular/core";
import {RubricaEstado} from "../../models/rubricaEstado/rubricaEstado";
import {RubricaEstadoService} from "../../services/rubricaEstado/rubricaEstado.service";


@Component({
  selector: 'app-rubricaEstado',
  templateUrl: './rubricaEstado.component.html',
})

export class RubricaEstadoComponent implements OnInit{

  rubricaEstados: RubricaEstado[];

  constructor(private rubricaEstadoService: RubricaEstadoService) {}

  ngOnInit() {
    this.loadRubricaEstados();
    console.log(this.rubricaEstados);
  }

  loadRubricaEstados() {
    return this.rubricaEstadoService.getRubricaEstados().subscribe((data: RubricaEstado[]) => {
      this.rubricaEstados = data;
    });
  }
}
