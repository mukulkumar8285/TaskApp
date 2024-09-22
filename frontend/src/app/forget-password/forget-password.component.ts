import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'] 
})
export class ForgetPasswordComponent {
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient , private router : Router) { }

  forgetPassword() {
    const forgetApi = "http://localhost:3000/api/forget";
    const payload = { email: this.email  , password : this.password};
    this.http.post(forgetApi, payload).subscribe({
      next: (response) =>{
        this.router.navigate(["/"]);
        console.log('Password reset link sent:', response)
      },
      error: (error) => console.error('Error sending reset request:', error)
    });
  }
}
