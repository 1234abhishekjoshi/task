import { Component, OnInit,EventEmitter } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router }  from '@angular/router';
var cardItem = [];
declare var $ : any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
products : any;

  constructor(private http:HttpService,private router:Router) { 
  	cardItem = JSON.parse(localStorage.getItem('cartItem'));
  			if(cardItem == undefined){
  				cardItem = [];
  			}
  }

  ngOnInit() {
  	this.http.getProduct();
  	this.http.products.subscribe((res)=>{
  		if(res['status']){
			this.products = res['rs'];
  		}
  		else{

  		console.log('in else');
  		}
  	});
  }
  addtocart(id){
  		var isinArray = cardItem.find(x=> x.id == id);
  		
  		if(isinArray == undefined){
  		
  		var cartproduct = this.products.filter(function(val){
  			if(val.id == id){
  					return val;
  			}
  		});
  		cardItem.push(cartproduct[0]);
  		localStorage.setItem('cartItem',JSON.stringify(cardItem));
  		this.http.cardData.emit(cardItem);
  		}
  }

}
