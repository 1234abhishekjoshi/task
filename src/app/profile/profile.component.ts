import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router }  from '@angular/router';
import {environment} from '../../environments/environment';

var cardItem = [];
declare var $ : any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 model : any = {};

imageurl : any;
  constructor(private http:HttpService) { 
  	var token = JSON.parse(localStorage.getItem('userDetail'));
  	if(token !=null){
  	 this.imageurl  = environment.baseurl+'uploads/'+token.image;
  	}
  }

  ngOnInit() {
  }
  uploadPhoto(){
  	 var formdata = new FormData();
  	 let file = $('#image')[0].files[0];
    var token = JSON.parse(localStorage.getItem('userDetail'));
  	 
  	 formdata.append("images", file);
  	 formdata.append('token',token.jwt);
  	 formdata.append('user_id',token.user_id);
  	 this.http.uploadPhoto(formdata);
  	 this.http.photo_upload.subscribe((res)=>{
  	 	console.log(res);
  	 	if(res.status){
  	 		this.imageurl = environment.baseurl+"uploads/"+res.rs;
  	 	}else{
  	 	alert('error to upload photo');
  	 	}
  	 });

  }

  changePassword(){
  	if(!this.model.oldpassword){
  		alert('enter old password');
  	}
  	else if(!this.model.newpassword){
  		alert('enter new password');
  	}
  	else if(this.model.newpassword != this.model.rpassword){
  		alert('retype password not match');
  	}
  	else{
  		this.http.changePassword(this.model);
  	}

  }

}

