import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../services/api';
import { Auth, user } from '@angular/fire/auth';
import { Programador, Proyecto } from '../../../../models/data.models';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  // Servicios e inyecciones
  private api = inject(ApiService);
  private auth = inject(Auth);
  private router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  user$ = user(this.auth);

  // Variables de estado
  proyectos: Proyecto[] = [];
  programadores: Programador[] = [];
  busqueda: string = '';
  tecnologiaFiltro: string | null = null;

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Carga de proyectos
    this.api.getProyectosDestacados().subscribe({
      next: (res: any) => {
        this.proyectos = res.data;
        this.cdr.detectChanges(); // Asegura el pintado inicial
      },
      error: (err) => console.error('Error proyectos:', err)
    });

    // Carga de programadores
    this.api.getProgramadores().subscribe({
      next: (res: any) => {
        this.programadores = res.data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error programadores:', err)
    });
  }

  // --- LÓGICA DE FILTRADO (Buscador y Tags) ---

  get todasLasTecnologias(): string[] {
    const techs = new Set<string>();
    this.proyectos.forEach(p => p.Tecnologias?.forEach(t => techs.add(t)));

    // Convertimos a array, ordenamos alfabéticamente y añadimos "Todas" al principio
    const listaOrdenada = Array.from(techs).sort();
    return ['Todas', ...listaOrdenada];
  }

  get proyectosFiltrados(): Proyecto[] {
    if (!this.proyectos) return [];

    return this.proyectos.filter(p => {
      const busca = this.busqueda.toLowerCase();

      const coincideBusqueda =
        p.Titulo.toLowerCase().includes(busca) ||
        p.Tecnologias?.some(t => t.toLowerCase().includes(busca));

      const coincideTecnologia = !this.tecnologiaFiltro ||
        p.Tecnologias?.includes(this.tecnologiaFiltro);

      return coincideBusqueda && coincideTecnologia;
    });
  }

  // --- MÉTODOS AUXILIARES ---

  getTecnologiasVisibles(tecnologias: string[]): string[] {
    return tecnologias ? tecnologias.slice(0, 3) : [];
  }

  getTecnologiasOcultas(tecnologias: string[]): number {
    return (tecnologias && tecnologias.length > 3) ? tecnologias.length - 3 : 0;
  }

  handleSolicitudClick(rutaDestino: string) {
    this.user$.pipe(take(1)).subscribe(currentUser => {
      if (currentUser) {
        this.router.navigate([rutaDestino]);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}