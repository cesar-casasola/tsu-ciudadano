import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TsuService } from '../../services/tsu.service';
import { LoginService } from '../../services/login.service';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../model/config';
import { PipeTransform, Pipe } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var qrcode: any;
import * as jquery from 'jquery';

@Component({
  selector: 'app-tsu-check',
  templateUrl: './tsu-check.component.html',
  styleUrls: ['./tsu-check.component.css']
})
export class TsuCheckComponent implements OnInit {

  @ViewChild('modalOK') public modalOK: ElementRef;
  @ViewChild('modalError') public modalError: ElementRef;

  modalTittle = ''
  modalMessage = ''

  loading: boolean=false;
  config: Config  
  buttonLogged = '';  

  ciudadano = '';  
  benefits = {};
  benefitsKeys = [];
  benefitsChecked = [];
  beneficios = new Map();

  constructor(private tsuService: TsuService,
    private loginService: LoginService, 
    private configService: ConfigService,
    private modalService: NgbModal) { }  

  initCiudadano(){
    this.ciudadano = '';    
    this.benefits = {};    
    this.benefitsKeys = [];    
    this.benefitsChecked = [];    
  }

  isAdmin(){
    return this.loginService.isAdmin()
  }

  isLogged() {
    return this.loginService.isLogged();
  }

  getUser() {
    return this.loginService.getUser();
  }

  logout(){
    this.loginService.logout();
  }

  ngOnInit() {   
    this.buttonLogged = this.getUser();   
    this.beneficios.set('largeFamily','Familia Numerosa');  
    this.beneficios.set('handicap','Misnusvalido');  
    this.beneficios.set('retired','Jubilado');  
    this.beneficios.set('unemployed','Desempleado');  
    this.beneficios.set('student','Estudiante');  
  }
  
  openQRCamera() {  
        
    this.initCiudadano();    
    let node : any = document.getElementById("trackingCodeFile")
    const  reader = new FileReader();    
    reader.onload = () => {          
      qrcode.callback = (res) => {    
        if(res instanceof Error) {
          this.modalTittle = 'Camera'            
          this.modalMessage = "No QR code found. Please make sure the QR code is within the camera's frame and try again.";
          this.modalService.open(this.modalError, { size: 'sm', backdrop: 'static'});                      
        } else {
          let resJSON = JSON.parse(res);         
          this.ciudadano = resJSON.userCode;
          this.benefits = resJSON.benefits;          
          this.benefitsKeys = Object.keys(this.benefits);
        }
      };
      qrcode.decode(reader.result);
    };        
    reader.readAsDataURL(node.files[0]);
  }	  
  
  checkBenefit(benefit) {		    
    this.loading = true;
    this.configService.getConfig().subscribe(config => {
      this.config = config;
      this.tsuService.checkBenefit(config.blockchainURL, this.loginService.getUser(), this.ciudadano, benefit)
        .subscribe(
          result => {            
            if (result.success){              
              if (result.payload == "True"){
                this.loading = false;
                this.benefitsChecked.push(benefit);
              }
              else
              {
                this.modalTittle = 'Comprobación Blockchain'
                this.modalMessage = "Beneficio " + benefit + " no concedido";
                this.modalService.open(this.modalError, { size: 'sm', backdrop: 'static'});                      
              }
            } 
            else
            {
              this.modalTittle = 'Comprobación Blockchain'
                this.modalMessage = result.payload;
                this.modalService.open(this.modalError, { size: 'sm', backdrop: 'static'});                      
            }                       
          },
          result => {            
            this.modalTittle = 'ERROR'            
            this.modalMessage = result.message;
            this.modalService.open(this.modalError, { size: 'sm', backdrop: 'static'});            
          }
        );
      });  
    }
}
