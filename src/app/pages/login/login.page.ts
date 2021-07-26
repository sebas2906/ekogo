import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:''
  password:''

  constructor(private api:ApiService,private router: Router) { 
    if(localStorage.getItem('user')){
      this.router.navigate(['home'], {replaceUrl:true}).then(()=>{
        window.location.reload();
      }); 
    }
  }

  ngOnInit() {

  }

  ingresar(){
    console.log(this.user);
    console.log(this.password);
    this.api.login(this.user,this.password).then((resp)=>{
      console.log(resp);
      if(resp['status']=='Accepted'){
        console.log('Logueado');
        localStorage.setItem('user',resp['userName']);
         this.router.navigate(['init-config'], {replaceUrl:true}).then(()=>{
          window.location.reload();
        }); 
      }
    });  
  }

}
