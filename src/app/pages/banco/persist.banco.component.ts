import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BancoService} from "../../services/banco/banco.service";
import {Banco} from "../../models/banco/banco.model";

@Component({
  selector: 'app-persist-banco',
  templateUrl: './persist.banco.component.html',
})
export class PersistBancoComponent implements OnInit {
  banco: Banco = new Banco();
  isEdit: boolean = false;

  constructor(
    private bancoService: BancoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bancoService.getBancoById(+id).subscribe((data: Banco) => {
        this.banco = data;
      });
    }
  }

  saveBanco() {
    if (this.isEdit) {
      this.bancoService.updateBanco(this.banco).subscribe(() => {
        this.router.navigate(['/banco']);
      });
    } else {
      this.bancoService.createBanco(this.banco).subscribe(() => {
        this.router.navigate(['/banco']);
      });
    }
  }
}
