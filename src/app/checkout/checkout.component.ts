import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router }  from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
cartItems : any;
totalPrice : any;
  constructor(private router:Router,private http:HttpService) { }

  ngOnInit() {
  			this.totalPrice = 0;
  			var self = this;
  	this.cartItems = JSON.parse(localStorage.getItem('cartItem'));
  			if(this.cartItems == undefined){
  				this.cartItems = [];
  			}

  			$.each(this.cartItems,function(i,val){
  				self.totalPrice = Number(self.totalPrice)+Number(val.price);
  				
  			});
  }
  removeCartItem(id){
  var self= this;
  	var newItems = [];
  	self.totalPrice = 0;
  	$.each(this.cartItems,function(i,val){
  		if(val.id != id){
  			newItems.push(val);
  			self.totalPrice = Number(self.totalPrice)+Number(val.price);
  		}
  	});
  	this.cartItems = newItems;
  	localStorage.setItem('cartItem',JSON.stringify(this.cartItems));
  }

  goToStripe(){
  	localStorage.setItem('totalAmt',this.totalPrice);
  	this.router.navigate(['/stripe']);
  }

}
