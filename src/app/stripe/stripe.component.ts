import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { Router }  from '@angular/router';

declare var $ : any;
import { HttpService } from '../service/http.service';
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {
	elements: Elements;
  card: StripeElement;
 
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
 
  stripeTest: FormGroup;
  constructor(private fb: FormBuilder,
    private stripeService: StripeService,private http:HttpService,private router:Router) { 
      var token = JSON.parse(localStorage.getItem('userDetail'));
    if(token == null){
      this.router.navigate(['/']);
      
    }
    }

  ngOnInit() {
  		this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });

  }

  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result['token']) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          
         this.http.pay(result['token']);
          this.http.payment.subscribe((res)=>{
          	console.log(res);

          	if(res.error){
          		$('.alert-danger').hide();
          		$('.alert-success').show();
          		$('.alert-success').html(res.message);
          	}
          	if(res.message == 'Access granted.'){
          	  this.http.saveOrder(res.rs.id);

          	}
          	


          });
        } else if (result['error']) {
          // Error creating the token
          $('.alert-success').hide();
          $('.alert-danger').show();
          $('.alert-danger').html(result['error']['message']);
        }
      });
  }


}
