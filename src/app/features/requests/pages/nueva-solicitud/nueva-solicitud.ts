import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-nueva-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nueva-solicitud.html'
})
export class NuevaSolicitud {
  nuevaSolicitud = {
    nombre: '',
    email: '',
    programador: '',
    descripcion: ''
  };

  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  async enviarSolicitud() {
    const user = this.auth.currentUser;
    if (!user) {
      alert('Sesión expirada. Inicia sesión de nuevo.');
      return;
    }

    try {
      const colRef = collection(this.firestore, 'solicitudes');
      await addDoc(colRef, {
        ...this.nuevaSolicitud,
        userId: user.uid,
        fecha: new Date().toLocaleDateString(),
        estado: 'Pendiente'
      });

      // Redirigir al dashboard después de guardar con éxito
      this.router.navigate(['/dashboard']); 
    } catch (error) {
      console.error('Error al crear:', error);
      alert('Error al enviar la solicitud.');
    }
  }
}