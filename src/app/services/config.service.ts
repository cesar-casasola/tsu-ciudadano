import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { IConfig } from '../model/config';
import { Config } from '../model/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig(): Observable<IConfig>{    
    return this.http.get<IConfig>("assets/config.json")       
  }

  setConfig(config: Config): Observable<IConfig>{    
    return this.http.post<IConfig>('assets/config.json', JSON.stringify(config));              
  };
}
