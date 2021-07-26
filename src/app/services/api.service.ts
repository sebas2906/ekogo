import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private host=environment.host;
  
  private market_request=environment.allSupermarkets;

  private login_request=environment.login;

  private products_request=environment.supermarketProducts;

  constructor(private http:HttpClient) { 
    
  }

  getMarketProducts(marketName:string){
    return this.http.get(`${this.host}${this.products_request}${marketName}`).toPromise();
    
  }

  getAllSupermarkets(){

    return this.http.get(`${this.host}${this.market_request}`).toPromise();
  }

  login(usuario:string,contrasena:string){
    return this.http.post(`${this.host}${this.login_request}`,{user:usuario,password:contrasena}).toPromise();
  }

  
}
