import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router }  from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 model : any = {};
  constructor(private http : HttpService,private router : Router) {
   }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('userDetail')) != null){
      this.router.navigate(['/home']);
    }
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
  login(){
  	
  	var re = /\S+@\S+\.\S+/;
     		var rest = re.test(this.model.username)
  	if(this.model.username != 'undefined' && this.model.loginpassword != 'undefined' && rest==true){
  		this.http.login(this.model);
  		this.http.logincheck.subscribe((res)=>{
  			if(res.status){
  				localStorage.setItem('userDetail',JSON.stringify(res));
  				this.router.navigate(['/home']); 
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
