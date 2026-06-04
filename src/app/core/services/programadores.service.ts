import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgramadoresService {
  private programadores = [
    {
      id: 'alexander-paucar',
      nombre: 'Alexander Paucar',
      rol: 'Arquitecto Full Stack',
      bio: 'Especialista en sistemas distribuidos...',
      proyectos: ['Nexus Gateway', 'Proyecto Compartido X']
    },
    {
      id: 'esteban-hernandez',
      nombre: 'Esteban Hernandez',
      rol: 'Especialista UI/UX',
      bio: 'Experto en interfaces fluidas...',
      proyectos: ['Proyecto Compartido X', 'Vortex Dashboard']
    }
  ];

  getProgramador(id: string) {
    return this.programadores.find(p => p.id === id);
  }

  getAll() {
    return this.programadores; // Devuelve el array completo
  }
}