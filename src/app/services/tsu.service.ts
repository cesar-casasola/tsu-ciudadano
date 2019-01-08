import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TsuService {

  constructor(private http: HttpClient) { }

  test(testURL: string): Observable<any>{        

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'text/html                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };

    //return this.http.get("https://restcountries.eu/rest/v2/name/france", requestOptions);
    return this.http.get(testURL);
      
  }

  getBenefits(blockchainURL: string, user: string, tsuUser: string): Observable<any>{    
             
    let tsuUrl = blockchainURL + '/tsu/getBenefits';   
    let headers = new HttpHeaders().set('Content-Type','application/json');        
    let data = {
      "user":{"username":user, "password": ""},
      "codeUser":tsuUser
    }
    return this.http.post(tsuUrl, data, {headers: headers});  
  }

  checkBenefit(blockchainURL: string, user: string, tsuUser: string, benefit: string): Observable<any>{    
             
    let tsuUrl = blockchainURL + '/tsu/checkBenefit';   
    let headers = new HttpHeaders().set('Content-Type','application/json');        
    let data = {
      "user":{"username":user, "password": ""},
      "codeUser":tsuUser,
      "benefit":benefit
    }
    return this.http.post(tsuUrl, data, {headers: headers});  
  }

  adduser(blockchainURL: string, user: string, tsuUser: string, benefits: Object): Observable<any>{    
             
    let tsuUrl = blockchainURL + '/tsu/addUser';   
    let headers = new HttpHeaders().set('Content-Type','application/json');   
    let data = {
      "user":{"username":user, "password": ""},
      "codeUser":tsuUser,
      "benefits": JSON.stringify(benefits)
    }
    return this.http.post(tsuUrl, data, {headers: headers});  
  }

  updateTsu(blockchainURL: string, user: string, tsuUser: string, benefits: Object): Observable<any>{    
             
    let tsuUrl = blockchainURL + '/tsu/updateTSU';   
    let headers = new HttpHeaders().set('Content-Type','application/json');   
    let data = {
      "user":{"username":user, "password": ""},
      "codeUser":tsuUser,
      "benefits": JSON.stringify(benefits)
    }
    return this.http.post(tsuUrl, data, {headers: headers});  
  }

}
