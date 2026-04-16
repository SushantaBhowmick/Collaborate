import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  constructor(private auth:Auth, private router: Router){}
user:any;
  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }


  ngOnInit() {
    // Fetch the user profile on component init
    this.auth.getProfile().subscribe(
      (user) => {
        this.user = user;
        console.log('User profile:', user);
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  getCurrentUser() {
    console.log(this.auth.getCurrentUser());
  }
}
