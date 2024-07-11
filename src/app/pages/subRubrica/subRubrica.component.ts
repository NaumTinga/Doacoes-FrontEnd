import {Component, OnInit} from "@angular/core";
import {SubRubrica} from "../../models/subRubrica/subRubrica";
import {SubRubricaService} from "../../services/subRubrica/subRubrica.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-subRubrica",
  templateUrl: "./subRubrica.component.html",
})

export class SubRubricaComponent implements OnInit {

  subRubrica: SubRubrica;

  constructor(private subRubricaService: SubRubricaService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getSubRubrica(id);
  }

  getSubRubrica(id: number) {
    return this.subRubricaService.getSubRubricaById(id).subscribe(
      (data: SubRubrica) => {
        this.subRubrica = data;
      }
    )
  }
}
