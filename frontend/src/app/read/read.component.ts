import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



export interface Task {
  _id: string; 
  Title: string;
  Description: string;
  Status: string;
  Priority: string;
  DueData: Date; 
}

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'] 
})
export class ReadComponent implements OnInit {
  tasks: Task[] = [];
  
  private apiUrl = 'http://localhost:3000/api/user'; 

  constructor(private http: HttpClient , private router : Router) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http.get<{ message: string; data: Task[] }>(`${this.apiUrl}/read`, { headers }).subscribe(
      (response) => {
        this.tasks = response.data; 
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onEdit(task: Task) {
    this.router.navigate(['/update', task._id]);
  }

  onDelete(task_id: string) {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${task_id}`, { headers }).subscribe(
      (response) => {
        console.log('Task deleted successfully:', response.message);
        
        this.tasks = this.tasks.filter(task => task._id !== task_id);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );

    console.log('Delete button clicked', task_id);
  }
}
