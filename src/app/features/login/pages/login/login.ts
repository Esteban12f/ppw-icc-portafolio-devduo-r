import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button-component/button-component';
import { CardComponent } from '../../../../shared/components/card-component/card-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent,],
  templateUrl: './login.html'
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);
  authError: string | null = null;
  activeTab: 'login' | 'register' = 'login';
  // Variables para Login
  loginData = { email: '', password: '' };
  // Variables para Registro
  regData = { email: '', password: '', confirmPassword: '' };
  emailError: string | null = null;
  passError: string | null = null;

  async handleAuth() {
    this.emailError = null;
    this.passError = null;

    try {
      await signInWithEmailAndPassword(this.auth, this.loginData.email, this.loginData.password);
      this.router.navigate(['/requests']);
    } catch (error: any) {
      // Firebase agrupa errores bajo 'auth/invalid-credential' 
      // pero puedes aplicar lógica personalizada aquí si detectas patrones
      if (error.code === 'auth/invalid-credential') {
        // Si quieres ser más específico, tendrías que hacer una llamada previa 
        // para verificar si el usuario existe, pero por seguridad, 
        // Firebase recomienda mostrar un error genérico.
        this.passError = 'Correo o contraseña incorrectos.';
      } else if (error.code === 'auth/invalid-email') {
        this.emailError = 'El formato del correo es inválido.';
      }
    }
  }

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    this.authError = null;
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