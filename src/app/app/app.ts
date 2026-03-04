import { Component, signal, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common'; // ضروري لو تستعمل *ngIf

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf] // هنا صحيح
})
export class App implements OnInit {
  isLoggedIn = signal<boolean>(false);

  ngOnInit() {
    if (typeof window !== 'undefined') { 
      this.checkLogin(); // localStorage ما ينجمش في SSR
    }
  }

  checkLogin() {
    const user = localStorage.getItem('user');
    this.isLoggedIn.set(!!user);
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) navbar?.classList.add('shadow-lg');
    else navbar?.classList.remove('shadow-lg');
  }
}