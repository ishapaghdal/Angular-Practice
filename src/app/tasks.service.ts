import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  message$ = new BehaviorSubject<string[]>([]);
  messages: string[] = [];
  private tasks = signal<String[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData : string){
    const newTask = taskData;
    this.tasks.update((oldTasks) => [...oldTasks]);
  }

  addMessage(message : string){
    this.messages= [...this.messages , message];
  this.message$.next(this.messages);
  }


}
