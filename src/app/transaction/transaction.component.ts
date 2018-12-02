import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router }  from '@angular/router';
var cardItem = [];
declare var $ : any;
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
transaction:any;
  constructor(private http:HttpService) { }

  ngOnInit() {
   this.http.getTransaction();
   this.http.transaction.subscribe((res)=>{
   	  if(res.status){
   	  	this.transaction = res.rs;
   	  }
   });
  }

}
