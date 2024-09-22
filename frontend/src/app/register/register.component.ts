import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule , FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username : string = "";
  email : string = "";
  password : string = "";
  confirmpassword : string = "";

  constructor(private http : HttpClient , private router : Router) { }
  onlogin(){
    this.router.navigate(["/"]);
  }

    onRegister(){
      if(this.password !== this.confirmpassword){
        alert("Passwords do not match");
        return;
      }
      const body =  {username : this.username , email : this.email ,password : this.password , confirmpassword : this.confirmpassword}
      const ApiRegister = "http://localhost:3000/api/register";

      this.http.post(ApiRegister , body).subscribe(
        response =>{
          this.router.navigate(["/"]);
          console.log("User Register Successfully" , response);
        },
        error =>{
          console.log("Error" , error);
        }
      )

    }
}
