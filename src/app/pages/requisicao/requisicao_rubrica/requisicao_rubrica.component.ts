import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RequisicaoRubricaService} from "../../../services/requisicao/requisicaoRubrica.service";
import {RequisicaoRubrica} from "../../../models/requisicao/requisicaoRubrica";
import {Cambio} from "../../../models/cambio/cambio";
import {CambioService} from "../../../services/cambio/cambio.service";
import Swal from "sweetalert2";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

@Component({
  selector: "app-requisicao_rubrica",
  templateUrl: "./requisicao_rubrica.component.html",
})
export class RequisicaoRubricaComponent implements OnInit {
  requisicoes: RequisicaoRubrica[] = [];
  cambios: Cambio[] = [];
  selectedRequisicoes: RequisicaoRubrica[] = [];
  selectedDataEmissao: Date = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requisicoesRubricaService: RequisicaoRubricaService,
    private cambioService: CambioService,
  ) {}

  ngOnInit() {
    this.loadRequisicoesRubrica();
    this.loadCambios();
  }

  loadRequisicoesRubrica(): void {
    this.requisicoesRubricaService.getRequisacoesRubricas().subscribe((data: RequisicaoRubrica[]) => {
      this.requisicoes = data;
      console.log('Requisicoes: ', this.requisicoes);
    });
  }

  loadCambios(): void {
    this.cambioService.getCambios().subscribe((data: Cambio[]) => {
      this.cambios = data;
      console.log('Cambios: ', this.cambios);
    });
  }

  viewRequisicaoRubrica(requisicao: RequisicaoRubrica): void {
    Swal.fire({
      title: `Requisição ${requisicao.id}`,
      html: `
      <strong>Descrição:</strong> ${requisicao.descricao}<br>
      <strong>Valor:</strong> ${requisicao.valor_convertido}<br>
      <strong>Data:</strong> ${new Date(requisicao.data_emissao).toLocaleDateString()}
    `,
      icon: 'info',
      confirmButtonText: 'OK',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-info'
      }
    });
  }


  // Checks if the cambio is updated or not
  checkCambio(): void {
    const currentDate = new Date();
    const matchingCambio = this.cambios.some(cambio => {
      const createdAt = new Date(cambio.created_at);
      const updatedAt = new Date(cambio.updated_at);
      return (
        this.isSameDay(createdAt, currentDate) || this.isSameDay(updatedAt, currentDate)
      );
    });

    if (matchingCambio) {
      this.router.navigate(['/persist-requisicao-rubrica']);
    } else {
      Swal.fire({
        title: 'Aviso!',
        html: 'O Câmbio não está actualizado! <br>' +
          'Por favor actualize o Câmbio para emitir requisições. ',
        icon: 'warning',
        confirmButtonText: 'OK',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-warning'
        }

      })
    }
  }
  // Used in the checkCambio method to get the dates
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Handlers for selected requisicoes
  onCheckboxChange(event: any, requisicao: RequisicaoRubrica) {
    if (event.target.checked) {
      if (this.selectedRequisicoes.length === 0) {
        this.selectedDataEmissao = requisicao.data_emissao;
        this.selectedRequisicoes.push(requisicao);
      } else if (requisicao.data_emissao === this.selectedDataEmissao) {
        this.selectedRequisicoes.push(requisicao);
      } else {
        event.target.checked = false; // Deselect checkbox if data_emissao does not match
      }
    } else {
      const index = this.selectedRequisicoes.indexOf(requisicao);
      if (index > -1) {
        this.selectedRequisicoes.splice(index, 1);
      }
      if (this.selectedRequisicoes.length === 0) {
        this.selectedDataEmissao = null;
      }
    }
  }

 //Exporting as PDF

 async  exportRequisicao(id: number): Promise<void>  {
  const requisicaoId = id; // Replace with the ID you want to filter
  const requisicao = this.requisicoes.find(req => req.id === requisicaoId);
  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  console.log('Requisicao with ID:', requisicaoId, requisicao);


  console.log('Exporting requisicao');
  console.log('Nr da requisição',id )
  const logoURL = 'assets/img/icons/logo.png';
  //   const logoURL = 'https://uem.mz/wp-content/uploads/2022/09/Logo-UEM-transparente-212x300.png';
  const pngImageBytes = await fetch(logoURL).then((res) => res.arrayBuffer())

  const pdfDoc = await PDFDocument.create()
  const pngImage = await pdfDoc.embedPng(pngImageBytes)
  const pngDims = pngImage.scale(0.2)
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  const today = new Date();

  page.drawImage(pngImage, {
    x:43,
    y: 760,
    width: pngDims.width,
    height: pngDims.height,
  })
page.drawText('UNIVERSIDADE EDUARDO MONDLANE',{x:180,y:790, size:12})
page.drawText('REQUISIÇÃO DE FUNDOS',{x:215,y:765, size:12})
page.drawText('N Req(comp):',{x:465,y:783, size:12})
  page.drawText(requisicao.nr_requisicao_interna.toString(),{x:470,y:764, size:12})
 page.drawRectangle({
  x: 460,
  y: 760,
  width: 80,
  height: 15,
  borderColor: rgb(1, 0, 0),
  borderWidth: 1.5,
})

//line 1
page.drawText('Requisição',{x:43, y:725,size:12})
page.drawLine({
start: { x: 120, y: 725 },
end: { x: 255, y: 725 },
color: rgb(0, 0, 0),
thickness: 0.3,
    });
    page.drawText(requisicao.nome_documento,{x:130,y:728,size:12})

    page.drawText('N/Ref:',{x:330,y:725,size:12})
    page.drawLine({
      start: {x:397,y:725},
      end:{x:532, y:725},
      thickness:0.3,

    });
    page.drawText(requisicao.nr_referencia.toString(),{x:407,y:728,size:12})

//line 2
    page.drawText('Projecto:',{x:43, y:698,size:12})
    page.drawLine({
      start: { x: 120, y: 698 },
      end: { x: 255, y: 698 },
      color: rgb(0, 0, 0),
      thickness: 0.3,
          });
          page.drawText(requisicao.rubrica_projecto.nome,{x:130,y:700,size:12})
          page.drawText('Ref:',{x:330,y:698,size:12})

          page.drawLine({
            start: {x:397,y:698},
            end:{x:532, y:698},
            thickness:0.3,
    
          });
          page.drawText('TBD',{x:407,y:700,size:12})

//Line 3
    page.drawText('TBD',{x:130,y:680,size:12})
    page.drawLine({
      start: {x:120,y:678},
      end:{x:255, y:678},
      thickness:0.3,

    });
    page.drawText('Banco:',{x:330,y:680,size:12})
    page.drawLine({
      start: {x:397,y:680},
      end:{x:532, y:680},
      thickness:0.3,

    });
    page.drawText('TBD',{x:407,y:682,size:12})


    // Linha 4
    page.drawText('Financiador',{x:43, y:662,size:12})

    page.drawText('TBD',{x:130,y:662,size:12})
    page.drawLine({
      start: {x:120,y:660},
      end:{x:255, y:660},
      thickness:0.3,

    });

    page.drawText('Conta:',{x:330,y:662,size:12})
    page.drawLine({
      start: {x:397,y:662},
      end:{x:532, y:662},
      thickness:0.3,

    });
    page.drawText('TBD',{x:407,y:664,size:12})
          
  //Linha 5
  page.drawText('Valor:',{x:330,y:648,size:12})
  page.drawLine({
    start: {x:397,y:648},
    end:{x:532, y:648},
    thickness:0.3,

  });
  page.drawText('TBD',{x:407,y:650,size:12})
  
  //Linha 6
  page.drawText('Data de ',{x:330,y:628,size:12})
  page.drawLine({
    start: {x:397,y:628},
    end:{x:532, y:628},
    thickness:0.3,

  });
  page.drawText(formatDate(today),{x:407,y:630,size:12})
  //linha 7
  page.drawText('Classificação Económica',{x:43, y:614,size:12})

  //Linha 8
  
  page.drawText('Código',{x:43, y:592,size:12})
  page.drawText('TBD',{x:130,y:594,size:12})
  page.drawLine({
    start: {x:120,y:592},
    end:{x:240, y:592},
    thickness:0.3,

  });
  page.drawText('Descrição:',{x:270,y:592,size:12})
    page.drawLine({
      start: {x:330,y:592},
      end:{x:532, y:592},
      thickness:0.3,

    });
    page.drawText(requisicao.descricao,{x:334,y:594,size:12})

    //Linha 9
    page.drawText('Pagável a:',{x:43, y:575,size:12})
    page.drawText('TBD',{x:130,y:575,size:12})

    page.drawText('Destinado a:',{x:43, y:558,size:12})
    page.drawText('TBD',{x:130,y:558,size:12})
    //linha 11
    page.drawText('Factura:',{x:43, y:541,size:12})
    page.drawText('TBD',{x:130,y:541,size:12})

    page.drawText('Valor da prestação Requisição:',{x:60,y:515,size:12})
    page.drawText('Valor de Requisição:',{x:60,y:490,size:12})
    page.drawText('TBD',{x:210,y:490,size:12})
    page.drawText('Câmbio:',{x:60,y:465,size:12})
     page.drawText('TBD',{x:210,y:465,size:12})
     page.drawText('Valor Estimado Cheque:',{x:60,y:440,size:12})
     page.drawText('TBD',{x:210,y:440,size:12})
     page.drawText('Câmbio em relação SEK:',{x:60,y:415,size:12})
     page.drawText('TBD',{x:210,y:415,size:12})
     page.drawText('Valor Convertido:',{x:60,y:390,size:12})
     page.drawText('TBD',{x:210,y:390,size:12})

     

     page.drawLine({
      start: {x:43,y:385},
      end:{x:540, y:385},
      thickness:0.3,

    });
    page.drawText('Situação Orçamental:',{x:60,y:370,size:12})
    page.drawText('TBD',{x:210,y:370,size:12})
    page.drawText('Disponibilidade Inicial:',{x:60,y:350,size:12})
    page.drawText('TBD',{x:210,y:350,size:12})
    page.drawText('Soma de Pagamentos:',{x:60,y:330,size:12})
    page.drawText('TBD',{x:210,y:330,size:12})
    page.drawText('Saldo Existente:',{x:60,y:310,size:12})
    page.drawText('TBD',{x:210,y:310,size:12})
    page.drawText('Saldo Final:',{x:60,y:290,size:12})
    page.drawText('TBD',{x:210,y:290,size:12})
    page.drawText('Outros Requisições pendentes:',{x:235,y:250,size:12})

    //Signatures

    page.drawText('Elaborado por',{x:65,y:195,size:12})
    page.drawLine({
     start: {x:43,y:165},
     end:{x:195, y:165},
     thickness:1,

   });

    page.drawText('Aos  __/__/_____',{x:63,y:140, size:12})

     page.drawText('Visto ',{x:200,y:195,size:12})
    page.drawLine({
     start: {x:253,y:165},
     end:{x:345, y:165},
     thickness:1,

   });

    page.drawText('Aos  __/__/_____',{x:200,y:140, size:12})
    

    
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


  emitirOPSelectedRequisicoes() {
    // Handle payment logic for selected requisicoes
    this.router.navigate(['/persist-ordem-pagamento'], { state: { requisicoes: this.selectedRequisicoes } });

  }

}

