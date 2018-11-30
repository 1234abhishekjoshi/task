import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
	signup: EventEmitter<any> = new EventEmitter<any>();	
  constructor(private http:HttpClient) { }
  createUser(data){
  		
  	this.http.post(environment.baseurl+'create_user.php',JSON.stringify({'name':data.fullname,'email':data.email,'gender':data.gender,'password':data.password})).subscribe((res)=>{
  		this.signup.emit(res);
  	});
  }
}
