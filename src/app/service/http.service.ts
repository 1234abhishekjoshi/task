import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Router }  from '@angular/router';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class HttpService {
	public cardData : EventEmitter<any> = new EventEmitter<any>();
	signup: EventEmitter<any> = new EventEmitter<any>();
	logincheck: EventEmitter<any> = new EventEmitter<any>();
	products : EventEmitter<any> = new EventEmitter<any>();	
payment : EventEmitter<any> = new EventEmitter<any>();
transaction : EventEmitter<any> = new EventEmitter<any>(); 
photo_upload : EventEmitter<any> = new EventEmitter<any>();
  constructor(private http:HttpClient,private router:Router) { }
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
  pay(data){
    var token = JSON.parse(localStorage.getItem('userDetail'));
    var amount = localStorage.getItem('totalAmt');
    
    this.http.post(environment.baseurl+'charges.php',JSON.stringify({'token':token.jwt,'stripeToken' : data['id'],'amount': amount})).subscribe((res)=>{
      this.payment.emit(res);
    });
  }
  saveOrder(id){
    var token = JSON.parse(localStorage.getItem('userDetail'));
    var amount = localStorage.getItem('totalAmt');
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    var products ='';
    $.each(cartItem,function(i,val){
      products+=val.id+',';
    });
    this.http.post(environment.baseurl+'orders.php',JSON.stringify({'token':token.jwt,'user_id' : token.user_id,'amount': amount,'transaction_id':id,'products' : products})).subscribe((res)=>{

    if(res['status'] == true){
      alert(res['rs']);
      localStorage.removeItem('cartItem');
      this.router.navigate(['/transaction']);
    }

    });
  }
   getTransaction(){
    var token = JSON.parse(localStorage.getItem('userDetail'));
    
    this.http.post(environment.baseurl+'get_transaction.php',JSON.stringify({'token':token.jwt,'user_id' : token.user_id})).subscribe((res)=>{
      this.transaction.emit(res);
    });
  }
  uploadPhoto(formdata){
     this.http.post(environment.baseurl+'upload_photo.php',formdata).subscribe((res)=>{
      this.photo_upload.emit(res);
    });
  }
  changePassword(data){
    var token = JSON.parse(localStorage.getItem('userDetail'));

      this.http.post(environment.baseurl+'change_password.php',JSON.stringify({'password':data.newpassword,'token':token.jwt,'user_id':token.user_id})).subscribe((res)=>{
       if(res['status']){
          alert(res['rs']);
       }
    });
  }
}
