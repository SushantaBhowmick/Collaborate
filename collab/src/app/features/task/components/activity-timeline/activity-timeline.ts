import { Component, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ActivityServices } from '../../services/activity/activity-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-timeline',
  imports: [CommonModule],
  templateUrl: './activity-timeline.html',
  styleUrl: './activity-timeline.css',
})
export class ActivityTimeline implements OnInit,OnChanges {

  @Input() taskId!: string;
  private activityService = inject(ActivityServices)

  // logs:any[]=[];
  logs=signal<any[]>([]);

    constructor() {
    console.log('Constructor called');
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

    ngOnChanges(changes: SimpleChanges): void {
    if(changes['taskId'] && this.taskId){
      this.fetchLogs();
    }
  }

  fetchLogs(){
     this.activityService.getActivities(this.taskId).subscribe({
      next:(res)=>{this.logs.set(res.data)}
      
    })
  }

}
