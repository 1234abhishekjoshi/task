import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
declare var $ : any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 model : any = {};
  constructor(private http : HttpService) { }

  ngOnInit() {
  }
  createUser(){
  		 var re = /\S+@\S+\.\S+/;
     		var rest = re.test(this.model.email)
  	if(this.model.fullname != 'undefined' && this.model.password != 'undefined' && this.model.email != 'undefined' && this.model.gender != 'undefined' && this.model.password == this.model.rpassword && rest==true){
  		this.http.createUser(this.model);
  		this.http.signup.subscribe((res)=>{
  			if(res.status){
  				$('.alert-danger').hide();
  				$('.alert-success').show();
  				$('.alert-success').html(res.message);
  			}
  			else{
  				$('.alert-success').hide();
  				$('.alert-danger').show();
  				$('.alert-danger').html(res.message);
  			}
  		});
  	}
  }
}
