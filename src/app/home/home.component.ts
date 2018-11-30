import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router }  from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
cartItems : any;
cartCount : any;
totalPrice : any;
  constructor(private router:Router,private http:HttpService) { 
  	this.cartCount =0;
  	this.totalPrice = 0;
  }

  ngOnInit() {

  		this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
  			if(this.cartItems == undefined){
  				this.cartItems = [];
  			}
  			this.cartCount = this.cartItems.length;
  			var self = this;

  			$.each(this.cartItems,function(i,val){
  				self.totalPrice = Number(self.totalPrice)+Number(val.price);

  				
  			});

  			
  	var token = JSON.parse(localStorage.getItem('userDetail'));
  	if(token != ""){
  		this.http.cardData.subscribe((res)=>{
  			
  			this.cartItems = res;

  			this.totalPrice = 0;
  			$.each(this.cartItems,function(i,val){
  				self.totalPrice = Number(self.totalPrice)+Number(val.price);

  				
  			});

  			
  			this.cartCount += 1; 

  		console.log(this.cartItems);
  		});
  	}else{
  		this.router.navigate(['/']);
  	}
  }



}
