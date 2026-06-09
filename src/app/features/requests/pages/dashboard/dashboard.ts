import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
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

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.cargarMisSolicitudes(user.uid);
      } else {
        this.solicitudes = [];
      }
    });
  }

  cargarMisSolicitudes(userId: string) {
    const colRef = collection(this.firestore, 'solicitudes');
    const q = query(colRef, where("userId", "==", userId));
    
    collectionData(q, { idField: 'id' }).subscribe(data => {
      this.solicitudes = data;
    });
  }
}