import { Component, OnInit } from '@angular/core';
import { TsuService } from '../../services/tsu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tsuService: TsuService) { }

  ngOnInit() {
  }

  test(){    
    this.tsuService.test('http://13.93.46.3:8000').subscribe(result => {            
      alert(JSON.stringify(result))
    });
  }  
}
