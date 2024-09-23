import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchQuery: string = '';
  sortDirection: string = 'asc';
  selectedPriority: string = '';  

  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http.get<{ message: string; data: Task[] }>(`${this.apiUrl}/read`, { headers }).subscribe(
      (response) => {
        this.tasks = response.data;
        this.filteredTasks = this.tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();

    this.filteredTasks = this.tasks.filter(task => {
      const matchesQuery = task.Title.toLowerCase().includes(query) || task.Description.toLowerCase().includes(query);
      const matchesPriority = this.selectedPriority ? task.Priority === this.selectedPriority : true;  

      return matchesQuery && matchesPriority;  
    });

    this.sortByDate();
  }

  sortByDate() {
    if (this.sortDirection === 'asc') {
      this.filteredTasks.sort((a, b) => new Date(a.DueData).getTime() - new Date(b.DueData).getTime());
      this.sortDirection = 'desc';
    } else {
      this.filteredTasks.sort((a, b) => new Date(b.DueData).getTime() - new Date(a.DueData).getTime());
      this.sortDirection = 'asc';
    }
  }

  onEdit(task: Task) {
    this.router.navigate(['/update', task._id]);
  }

  onDelete(task_id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${task_id}`, { headers }).subscribe(
      (response) => {
        console.log('Task deleted successfully:', response.message);
        this.tasks = this.tasks.filter(task => task._id !== task_id);
        this.applyFilter();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
