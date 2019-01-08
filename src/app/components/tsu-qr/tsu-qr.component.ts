import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var QRCode: any;
import * as jquery from 'jquery';

@Component({
  selector: 'app-tsu-qr',
  templateUrl: './tsu-qr.component.html',
  styleUrls: ['./tsu-qr.component.css']
})
export class TsuQrComponent implements OnInit {
  
  constructor(public activeModal: NgbActiveModal) { }

  @Input() ciudadano: string;
  @Input() benefits: {};
  
  qrcode = null;

  ngOnInit() {     
    let qrcode = document.getElementById("qrcode2");
    if (qrcode){       
      this.qrcode = new QRCode(qrcode, {
        width : 300,
        height : 300
      });	
          
      let benefitRequest = {
        userCode: this.ciudadano,
        benefits: this.benefits                  
      }		    
      this.qrcode.makeCode(JSON.stringify(benefitRequest)); 
    }   
  } 

  closeModal() {
    this.activeModal.close('Modal Closed');
  }  
}
