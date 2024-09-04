import {Component, OnInit} from "@angular/core";
import {OrdemPagamento} from "../../models/ordemPagamento/ordemPagamento";
import {OrdemPagamentoService} from "../../services/ordemPagamento/ordemPagamento.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
@Component({
  selector: "app-ordem-pagamento",
  templateUrl: "./ordem-pagamento.html",
})

export class OrdemPagamentoComponent implements OnInit {

  ordens_pagamentos: OrdemPagamento[] = [];

  constructor(private ordemPagamentoService: OrdemPagamentoService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.loadOrdemPagamentos();
  }

  loadOrdemPagamentos(): void {
    this.ordemPagamentoService.getAll().subscribe((data: OrdemPagamento[]) => {
      this.ordens_pagamentos = data;
      console.log('Ordens de Pagamentos: ',this.ordens_pagamentos);
    })
  }

  async  exportCarta(id: number): Promise<void>  {
    const cartaId = id;

    const currentDate = new Date();

    this.currentDay = currentDate.getDate().toString();
    this.currentMonth = this.monthNames[currentDate.getMonth()]; // Months are zero-based, so add 1
    this.currentYear = currentDate.getFullYear().toString();
  }
  private monthNames: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  currentDay!: string;
  currentMonth: string | undefined;
  currentYear: string | undefined;

  
  async createPdf() {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
  
    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
   // const sansSerifFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // Add a blank page to the document
    const page = pdfDoc.addPage();
  
    // Get the width and height of the page
    const { width, height } = page.getSize();
  
    page.drawText('Ao',{x:339,y:790, size:12})
    page.drawText('Banco de Moçambique',{x:339,y:775, size:12})
    page.drawText('Maputo',{x:339,y:760, size:12})
    page.drawText('N/Refª:',{x:43,y:720, size:12})
    page.drawText('TBD',{x:85,y:720, size:12})
    page.drawText('Maputo aos'+' '+this.currentDay+' '+'de'+' '+this.currentMonth+' '+this.currentYear,{x:339,y:720, size:12})
    page.drawText('ASSUNTO:',{x:43,y:685, size:12})
    page.drawText('Operação bancária',{x:105,y:685, size:12})
    page.drawText('Solicita-se a V. Excia a efectivação da seguinte operação:',{x:43,y:645, size:12})
    page.drawText('1 Operação:',{x:43,y:590, size:12})
   //lINE TO SIMULATE UNDERLINE STYLE FOR 'OPERACAO'
    page.drawLine({
start: { x: 43, y: 588 },
end: { x: 105, y: 588 },
color: rgb(0, 0, 0),
thickness: 1,
    });
    page.drawText('TRANSFERÊNCIA BANCÁRIA:',{x:150,y:590, size:12})
  
    page.drawText('2 Valor:',{x:43,y:560, size:12})
//lINE TO SIMULATE UNDERLINE STYLE FOR 'VALOR'
    page.drawLine({
start: { x: 43, y: 558 },
end: { x: 85, y: 558 },
color: rgb(0, 0, 0),
thickness: 1,
    });
    page.drawText(' XXX.XXX,XX MT',{x:150,y:560, size:12})
    page.drawText('(XXX mil meticais)',{x:150,y:548, size:10})
    page.drawText('3 Beneficiário:',{x:43,y:520, size:12})
    page.drawText('TBD',{x:150,y:520, size:12})
//lINE TO SIMULATE UNDERLINE STYLE FOR 'BENEFICIARIO'
    page.drawLine({
start: { x: 43, y: 518 },
end: { x: 110, y: 518 },
color: rgb(0, 0, 0),
thickness: 1,
    });
    page.drawText('5 Banco credor:',{x:43,y:500, size:12})
    page.drawText('Codigo SWIFT:',{x:50,y:480, size:10})
    page.drawText('Balcao:',{x:50,y:460, size:10})
    page.drawText('Maputo:',{x:150,y:460, size:10})
//lINE TO SIMULATE UNDERLINE STYLE FOR 'BANCO CREDOR'
    page.drawLine({
start: { x: 43, y: 498 },
end: { x: 115, y: 498 },
color: rgb(0, 0, 0),
thickness: 1,
    });
    page.drawText('TBD',{x:150,y:500, size:12})
    page.drawText('6 Conta a creditar:',{x:43,y:430, size:12}) 
//lINE TO SIMULATE UNDERLINE STYLE FOR 'CONTA A CREDITAR'
    page.drawLine({
start: { x: 43, y: 428 },
end: { x: 120, y: 428 },
color: rgb(0, 0, 0),
thickness: 1,
    });
    page.drawText('TBD',{x:150,y:430, size:12})
    page.drawText('7 Referências:',{x:43,y:380, size:12})
//lINE TO SIMULATE UNDERLINE STYLE FOR 'REFERENCIAS'
    page.drawLine({
start: { x: 43, y: 378 },
end: { x: 115, y: 378 },
color: rgb(0, 0, 0),
thickness: 1,
    });
    page.drawText('Requisição Interna',{x:150,y:380, size:12})
    page.drawText('8 Outros:',{x:43,y:350, size:12})
//lINE TO SIMULATE UNDERLINE STYLE FOR 'OUTROS'
    page.drawLine({
start: { x: 43, y: 348 },
end: { x: 95, y: 348 },
color: rgb(0, 0, 0),
thickness: 1,
    });
    page.drawText('TBD',{x:150,y:350, size:12})
    page.drawText('Os Assinantes',{x:250,y:210, size:12})
    page.drawText('Assinante #1',{x:43,y:180, size:12})
    page.drawText('Assinante #2',{x:390,y:180, size:12})
    page.drawText('ID da carta',{x:270,y:165, size:8})
    page.drawText('TBD',{x:350,y:165, size:8})

    //operacoes
    page.drawText('Id de Operações',{x:270,y:140, size:8})
    page.drawText('TBD',{x:270,y:120, size:8})
    // Nr de requisição
     page.drawText('Nº de Requisição',{x:350,y:140, size:8})
    page.drawText('TBD',{x:350,y:120, size:8}) 
    //Rubrica
    page.drawText('Rubrica',{x:420,y:140, size:8})
    page.drawText('TBD',{x:420,y:120, size:8})
    //Valor
    page.drawText('Valor',{x:470,y:140, size:8})
    page.drawText('XXX MT',{x:470,y:120, size:8})
 
  

   
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
  
    this.saveByteArray('test.pdf', pdfBytes);
  }
  saveByteArray(reportName: string, byte: BlobPart) {
    const blob = new Blob([byte], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = reportName;
    link.download = fileName;
    link.click();
  }



}
  

