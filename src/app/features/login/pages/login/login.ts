import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button-component/button-component';
import { InputGroupComponent } from '../../../../shared/components/input-group-component/input-group-component';
import { CardComponent } from '../../../../shared/components/card-component/card-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputGroupComponent, ButtonComponent],
  templateUrl: './login.html'
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);
  
  activeTab: 'login' | 'register' = 'login';
  
  // Variables para los campos del formulario
  email = '';
  password = '';
  confirmPassword = '';

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  async handleAuth() {
    try {
      if (this.activeTab === 'login') {
        await signInWithEmailAndPassword(this.auth, this.email, this.password);
      } else {
        if (this.password !== this.confirmPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
        await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      }
      this.router.navigate(['/requests']);
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la autenticación: ' + error);
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      this.router.navigate(['/requests']);
    } catch (error) {
      console.error('Error Google:', error);
    }
  }
}