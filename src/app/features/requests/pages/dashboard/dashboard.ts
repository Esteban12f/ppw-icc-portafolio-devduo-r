import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { ButtonComponent } from '../../../../shared/components/button-component/button-component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  activeTab: 'sent' | 'received' = 'sent';
  solicitudes: any[] = []; 

  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef); // Necesario para asegurar la actualización de la vista

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.cargarMisSolicitudes(user.uid);
      } else {
        this.solicitudes = [];
      }
    });
  }

  private async cargarMisSolicitudes(userId: string) {
    try {
      const colRef = collection(this.firestore, 'solicitudes') as CollectionReference<DocumentData>;
      const q = query(colRef, where("userId", "==", userId));
      
      const snapshot = await getDocs(q);
      
      this.solicitudes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("Solicitudes cargadas:", this.solicitudes);
      
      // Forzamos a Angular a detectar los cambios y renderizar la tabla
      this.cdr.detectChanges(); 
      
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
    }
  }
}