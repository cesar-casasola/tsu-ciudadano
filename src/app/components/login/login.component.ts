import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { Config } from '../../model/config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('modal') public modal: ElementRef;

  modalTittle = ''
  modalMessage = ''

  userName = 'user1';
  password = 'user1';
  loading: boolean=false;
  config: Config

  constructor(private loginService: LoginService, 
    private configService: ConfigService, 
    private router: Router,
    private modalService: NgbModal) 
    { }

  tryLogin() {        
    this.loading = true;
    this.configService.getConfig().subscribe(config => {
      this.config = config;
      this.loginService.login(config.blockchainURL,this.userName,this.password)
        .subscribe(
          result => {
            this.loading = false;  
            if (result.token) {
              this.loginService.setToken(result.token);
              this.loginService.setRole(result.role);
              this.loginService.setUser(this.userName);              
              if (result.role == 'admin')              
                this.router.navigateByUrl('/admin');  
              if (result.role == 'check')              
                this.router.navigateByUrl('/check');              
              else
                this.router.navigateByUrl('/user');    
            }
          },
          result => { 
            this.modalTittle = 'ERROR'               
            this.modalMessage = result.message
            this.modalService.open(this.modal, { size: 'sm', backdrop: 'static'});            
          }
        );
      });          
  }

  ngOnInit() {
  }
}

