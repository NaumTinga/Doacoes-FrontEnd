import {Component, OnInit} from "@angular/core";
import {Financiador} from "../../models/financiador/financiador";
import {FinanciadorService} from "../../services/financiador/financiador.service";
import * as html2PDF from 'html2pdf.js';

@Component({
  selector: "app-financiador",
  templateUrl: "./financiador.component.html",
})

export class FinanciadorComponent implements OnInit {

  financiadores: Financiador[];

  constructor(private financiadorService: FinanciadorService) {
  }
  ngOnInit() {
    this.loadFinanciadores();
  }
  exportClick(){
    const options ={
      filename: 'Our_file.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: {orientation:'landscape'}
    };
    const content: Element = document.getElementById('gradient');
    html2PDF()
    .from(content)
    .set(options)
    .save();
  }
  loadFinanciadores(): void {
    this.financiadorService.getFinanciadores().subscribe((data: Financiador[]) => {
      this.financiadores = data;
      console.log(this.financiadores);
    })
  }
}
