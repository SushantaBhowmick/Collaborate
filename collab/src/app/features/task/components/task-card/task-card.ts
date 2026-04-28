import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';

type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

interface Task {
  priority: Priority;
  // add other fields if needed
}

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  
  @Input() task!:any;

  getPriorityColor() {
    return {
      LOW: 'bg-green-100 text-green-600',
      MEDIUM: 'bg-yellow-100 text-yellow-600',
      HIGH: 'bg-red-100 text-red-600'
    }[this.task.priority as Priority];
  }

}
