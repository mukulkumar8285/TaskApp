import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  setRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    const body = { email: this.email, password: this.password };
    const ApiLogin = 'http://localhost:3000/api/login';
    this.http.post(ApiLogin, body).subscribe(
      (response : any) => {
        console.log(response);
        localStorage.setItem("token" , response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ForgetPasword(){
    this.router.navigate(['/forget-password']);
  }
 
}
