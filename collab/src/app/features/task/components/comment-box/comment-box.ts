import { Component, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommentServices } from '../../services/comments/comment-services';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-box',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './comment-box.html',
  styleUrl: './comment-box.css',
})
export class CommentBox implements OnInit, OnChanges{


  @Input() taskId!: string;
  private commentservice = inject(CommentServices)
  private toastService = inject(ToastService)
  
  private fb  = inject(FormBuilder)
  // comments:any[]=[];
  comments=signal<any[]>([]);
  
  
  form= this.fb.group({
    text:['']
  })
  
  ngOnInit(): void {

    // this.loadComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['taskId'] && this.taskId){
      this.loadComments();
    }
  }

  loadComments(){
    this.commentservice.getComments(this.taskId).subscribe({
      next:(res)=>{
        this.comments.set(res.data)
      }
    })
  }

  submit(){
    const data={
      taskId:this.taskId,
      text:this.form.value.text,
    }
    console.log(data)
    this.commentservice.addComment(data).subscribe({
      next:(res)=>{
        this.form.reset(),
        this.loadComments(),
        this.toastService.success("Comment Added")
      }
    })
  }
}


