import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, CommonModule, RouterLinkWithHref],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}
  user: any=signal(null);

  logout() {
    console.log('logout');
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const fetchUesr = () => {
      this.auth.getMe().subscribe({
        next: (res) => {
          this.user.set(res.data)
          console.log({ res });
        },
      });
    };
    fetchUesr();
  }
}
