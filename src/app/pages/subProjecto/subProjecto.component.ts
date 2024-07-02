import {Component, OnInit} from '@angular/core';
import {SubProjecto} from '../../models/subProjecto/subProjecto';
import {SubProjectoService} from '../../services/subProjecto/subProjecto.service';

@Component({
  selector: 'app-subProjecto',
  templateUrl: './subProjecto.component.html',
})

export class SubProjectoComponent implements OnInit{

  subProjectos: SubProjecto[];

  constructor(private subProjectoService: SubProjectoService) {}

  ngOnInit() {
    this.loadSubProjectos();
    console.log(this.subProjectos);
  }

  loadSubProjectos() {
    return this.subProjectoService.getSubProjectos().subscribe((data: SubProjecto[]) => {
      this.subProjectos = data;
    });
  }
}
