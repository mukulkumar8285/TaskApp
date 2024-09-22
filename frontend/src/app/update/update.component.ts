import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Task } from '../read/read.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule , FormsModule , HttpClientModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  taskId: string | null = null;
  updateData: Task = {
    _id: '',
    Title: '',
    Description: '',
    Status: '',
    Priority: '',
    DueData: new Date()
  };
  
  private apiUrl = 'http://localhost:3000/api/user'; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
   if(this.taskId){
    this.fetchTask(this.taskId);
   }
  }
  fetchTask(id : string){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `${token}`)
    this.http.get<{message : string; data : Task}>(`${this.apiUrl}/read/${id}` , {headers}).subscribe((response)=>{ 
      // console.log(response.data);
      this.updateData = response.data;
    },(error)=>{
      console.log(error);
    })
  }

  onUpdate() {
    if (this.updateData.DueData instanceof Date) {
      const dueDate = new Date(this.updateData.DueData);
      const formattedDueDate = dueDate.toISOString().split('T')[0];
      this.updateData.DueData = formattedDueDate as any; 
    }
  

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http.put<{ message: string }>(`${this.apiUrl}/update/${this.taskId}`, this.updateData, { headers }).subscribe(
      (response) => {
        console.log('Task updated successfully:', response.message);
        this.router.navigate(['/read']); 
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
}


