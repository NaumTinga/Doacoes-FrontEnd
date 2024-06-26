import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {BancoService} from "../../services/banco/banco.service";
import {Banco} from "../../models/banco/banco.model";
import swal from 'sweetalert2';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
})
export class BancoComponent implements OnInit {
  closeResult: string;
  bancos: Banco[];
  banco: Banco = new Banco();

  constructor(private modalService: NgbModal, private bancoService: BancoService) {}

  ngOnInit(): void {
    this.loadBancos();
  }

  loadBancos(): void {
    this.bancoService.getBancos().subscribe((data: Banco[]) => {
      this.bancos = data;
    });
  }



  open(content, type, modalDimension) {
    console.log('Opening modal with content:', content);
    console.log('Type:', type);
    console.log('Modal Dimension:', modalDimension);

    let modalRef;
    if (modalDimension === 'sm' && type === 'modal_mini') {
      modalRef = this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true });
    } else if (modalDimension === '' && type === 'Notification') {
      modalRef = this.modalService.open(content, { windowClass: 'modal-danger', centered: true });
    } else {
      modalRef = this.modalService.open(content, { centered: true });
    }

    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
