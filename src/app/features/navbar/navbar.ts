import { Component, inject } from '@angular/core';
import { Auth, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html'
})
export class Navbar {
  private auth = inject(Auth);
  private router = inject(Router);
  
  currentUser: User | null = null;

  constructor() {
    // Escucha el estado del usuario para mostrar el correo y el botón salir
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }
}