import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TsuService } from '../../services/tsu.service';
import { LoginService } from '../../services/login.service';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../model/config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TsuQrComponent } from '../tsu-qr/tsu-qr.component';

declare var QRCode: any;
import * as jquery from 'jquery';

@Component({
  selector: 'app-tsu-user',
  templateUrl: './tsu-user.component.html',
  styleUrls: ['./tsu-user.component.css']
})

export class TsuUserComponent implements OnInit {
  
  @ViewChild('modalOK') public modalOK: ElementRef;
  @ViewChild('modalError') public modalError: ElementRef;
  modalTittle = ''
  modalMessage = ''

  loading: boolean=false;
  config: Config  
  //qrcode2 = null;
  buttonLogged = '';  

  qrcode = null;
  ciudadano = '';
  benefits = {
    largeFamily: false,
    handicap: false,
    retired: false,
    unemployed: false,
    student: false
  };

  found = false;

  constructor(private tsuService: TsuService,
    private loginService: LoginService, 
    private configService: ConfigService,
    private modalService: NgbModal) { }  

  initBenefits(){
    this.benefits = {
      largeFamily: false,
      handicap: false,
      retired: false,
      unemployed: false,
      student: false
    };
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
    let qrcode = document.getElementById("qrcode");
    if (qrcode){       
      this.qrcode = new QRCode(qrcode, {
        width : 50,
        height : 50
      });	
    }
    this.buttonLogged = this.getUser();
    this.found = false;
  }
  
  keydown(e){        
    if (e.keyCode == 13) {      
      this.makeCode();
    }
    this.found = false;
    this.initBenefits();
  }

  makeCode(){
    if (this.qrcode){
      let benefitRequest = {
        userCode: this.ciudadano,
        benefits: this.benefits                  
      }		    
      this.qrcode.makeCode(JSON.stringify(benefitRequest));    
    }
  }

  showQR(){        
    const modalRef = this.modalService.open(TsuQrComponent,{ size: 'lg', backdrop: 'static'});        
    modalRef.componentInstance.ciudadano = this.ciudadano;
    modalRef.componentInstance.benefits = this.benefits;    
  }  
  
  getBenefits(){

    this.loading = true;
    this.configService.getConfig().subscribe(config => {
      this.config = config;      
      this.tsuService.getBenefits(config.blockchainURL, this.loginService.getUser(), this.ciudadano)
        .subscribe(
          result => {            
            if (result.success){
              this.loading = false; 
              this.benefits = result.payload;  
              this.found = true;            
            }
            else{              
              this.modalTittle = 'ERROR de Búsqueda'            
              this.modalMessage = "Ciudadano no encontrado en Blockchain. (" + result.payload + ")";
              this.found = false;  
              this.initBenefits();
              this.modalService.open(this.modalError, { size: 'sm', backdrop: 'static'});                          
            }
          },          
          result => {            
            alert(JSON.stringify(result))
            this.modalTittle = 'ERROR'            
            this.modalMessage = result.message;
            this.found = false;  
            this.initBenefits();
            this.benefits = null;
            this.modalService.open(this.modalError, { size: 'sm', backdrop: 'static'});                        
          }
        );
      });              
  }

  addUser(){

    this.loading = true;
    this.configService.getConfig().subscribe(config => {
      this.config = config;
      this.tsuService.adduser(config.blockchainURL, this.loginService.getUser(), this.ciudadano, this.benefits)
        .subscribe(          
          result => {            
            if (result.success){
              this.loading = false; 
              this.found = true; 
              this.modalTittle = 'Alta Blockchain'            
              this.modalMessage = result.message;
              this.modalService.open(this.modalOK, { size: 'sm', backdrop: 'static'});
            }
            else{
              this.loading = false;               
              this.modalTittle = 'Alta Blockchain'            
              this.modalMessage = result.message;
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

  updateTsu(){

    this.loading = true;
    this.configService.getConfig().subscribe(config => {
      this.config = config;
      this.tsuService.updateTsu(config.blockchainURL, this.loginService.getUser(), this.ciudadano, this.benefits)
        .subscribe(
          result => {
            if (result.success){
              this.loading = false;  
              this.modalTittle = 'Actualización Blockchain'            
              this.modalMessage = result.message;
              this.modalService.open(this.modalOK, { size: 'sm', backdrop: 'static'});             
            }
            else{
              this.loading = false;               
              this.modalTittle = 'Actualización Blockchain'            
              this.modalMessage = result.message;
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
