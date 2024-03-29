import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from 'app/models/loginDto';
import { TokenVm } from 'app/models/tokenVm';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginDto: LoginDto = {
        userName: '',
        password: ''
    };
    tokenVm: TokenVm;
  
    constructor( public location: Location, private router: Router, private httpClient: HttpClient, ) {}

    ngOnInit() {

        
    }
    login(){
        this.httpClient.post('Auth', this.loginDto)
        .subscribe(
            (res: TokenVm)=>{
                if(res.roles.includes('Admin')){
                    this.router.navigate(['/admin/category']);
                }
                else{
                    this.router.navigate(['/admin/item']);
                }
            },
            error=>{
                $.notify({
                    icon: "notifications",
                    message: error.error
                  },
                  {
                    type: 'danger',
                    timer: 1000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    },
                  });
            }
        );

    }
}
