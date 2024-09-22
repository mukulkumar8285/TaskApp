import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deshboard',
  standalone: true,
  imports: [FormsModule , HttpClientModule],
  templateUrl: './deshboard.component.html',
  styleUrl: './deshboard.component.css'
})
export class DeshboardComponent {
  Title: string= "" ;
  Description : string = "";
  Status : string = "";
  Priority : string = "";
  DueData : string = "";


  constructor(private http : HttpClient , private router : Router){}

  onCreate(){
    const dueDate = new Date(this.DueData);
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    const data = {Title :  this.Title , Description : this.Description , Status : this.Status ,Priority :  this.Priority ,DueData :  formattedDueDate }
    console.log(data);
    const CreateApi = "http://localhost:3000/api/user/create";
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `${token}`)
    console.log(token);

    this.http.post(CreateApi , data , {headers}).subscribe((res) => {
      console.log(res);
  }, (error)=>{
    console.log(error);
  }
  )

}
onRead(){
  this.router.navigate(["/read"]);
}
}
