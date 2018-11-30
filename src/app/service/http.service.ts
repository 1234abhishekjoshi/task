import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
	public cardData : EventEmitter<any> = new EventEmitter<any>();
	signup: EventEmitter<any> = new EventEmitter<any>();
	logincheck: EventEmitter<any> = new EventEmitter<any>();
	products : EventEmitter<any> = new EventEmitter<any>();	

  constructor(private http:HttpClient) { }
  createUser(data){
  		
  	this.http.post(environment.baseurl+'create_user.php',JSON.stringify({'name':data.fullname,'email':data.email,'gender':data.gender,'password':data.password})).subscribe((res)=>{
  		this.signup.emit(res);
  	});
  }
  login(data){
  		
  	this.http.post(environment.baseurl+'login.php',JSON.stringify({'email':data.username,'password':data.loginpassword})).subscribe((res)=>{
  		this.logincheck.emit(res);
  	});
  }
  getProduct(){
  	var token = JSON.parse(localStorage.getItem('userDetail'));
  	this.http.post(environment.baseurl+'get_products.php',JSON.stringify({'token':token.jwt})).subscribe((res)=>{
  		this.products.emit(res);
  	});
  }
}
