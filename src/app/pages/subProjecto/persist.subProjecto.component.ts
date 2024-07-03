import { Component,OnInit } from "@angular/core";
import { SubProjecto } from "src/app/models/subProjecto/subProjecto";
import { SubProjectoService } from "src/app/services/subProjecto/subProjecto.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Projecto } from "src/app/models/projecto/projecto.model";
import { ProjectoService } from "src/app/services/projecto/projecto.service";
import { Beneficiario } from "src/app/models/beneficiario/beneficiario.model";
import { Actividade } from "src/app/models/actividade/actividade.model";
import Swal from "sweetalert2";
import { BeneficiarioService } from "src/app/services/beneficiario/beneficiario.service";
@Component({
    selector: 'app-persist.subProjecto',
    templateUrl: './persist.subProjecto.component.html',

})
export class PersistSubProjectoComponent implements OnInit {
    subProjecto: SubProjecto = new SubProjecto();
    isEdit = false;
    
    beneficiarios: Beneficiario[];
    projectos: Projecto[];
    constructor(private subProjectoService: SubProjectoService,
        private router: Router,
        private projectoService: ProjectoService,
        private beneficiarioService: BeneficiarioService,
        private route: ActivatedRoute, ){
    
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if(id){
            this.isEdit = true;
            this.subProjectoService.getSubProjectoById(+id).subscribe((data: SubProjecto) =>{
                this.subProjecto = data;
                
            });
        }
        // Fetch list of Beneficiarios
        this.beneficiarioService.getBeneficiarios().subscribe((data: Beneficiario[])=>{
            this.beneficiarios = data;
        })
        // Fetch list of Projectos
        this.projectoService.getProjectos()
        }

        
        saveSubProjecto(){
            if(this.isEdit){
                this.subProjectoService.updateSubProjecto(this.subProjecto).subscribe(()=> {
                   Swal.fire({
                        title: 'Sucesso',
                        text: 'SubProjecto actualizado!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn btn-sucess'
                        }
                    }).then(()=>{
                        this.router.navigate(['/subProjecto']);

                    });
                });
            }else{
                this.subProjectoService.saveSubProjecto(this.subProjecto).subscribe(()=>{
                    Swal.fire({
                        title: 'Sucesso',
                        text: 'Sub Projecto adicionado!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        buttonsStyling: false,
                        customClass: {
                          confirmButton: 'btn btn-success'
                        }
                      }).then(() => {
                        this.router.navigate(['/subProjecto']);
                      });
                    });
              
            }    
            }
        }
        
    

