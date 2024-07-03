import {Component, OnInit} from "@angular/core";
import {Projecto} from "../../models/projecto/projecto";
import {ProjectoService} from "../../services/projecto/projecto.service";

@Component({
  selector: 'app-projecto',
  templateUrl: './projecto.component.html',
})

export class ProjectoComponent implements OnInit{

  projectos: Projecto[];

  constructor(private projectoService: ProjectoService) {
  }
  ngOnInit() {
    this.loadProjectos()
  }

  loadProjectos() {
    this.projectoService.getProjectos().subscribe((data: Projecto[]) => {
      this.projectos = data;
    })
  }
}
