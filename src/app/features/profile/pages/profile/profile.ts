import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramadoresService } from '../../../../core/services/programadores.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class Profile implements OnInit {
  todosLosProgramadores: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private scroller: ViewportScroller,
    private progService: ProgramadoresService // Inyecta el servicio aquí
  ) { }

  ngOnInit() {
    // 1. Cargamos los datos del servicio
    this.todosLosProgramadores = this.progService.getAll();

    // 2. Manejamos el scroll si viene un fragmento
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scroller.scrollToAnchor(fragment);
        }, 300);
      }
    });
  }
}