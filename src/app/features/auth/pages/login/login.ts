import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule]
})
export class Login {
  activeTab: 'login' | 'register' = 'login';

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }
}