import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-detalle-proyecto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-proyecto.html',
})
export class DetalleProyectoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  proyecto: any = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.cargarProyecto(slug);
      }
    });
  }

  cargarProyecto(slug: string) {
    this.api.getProyectoBySlug(slug).subscribe((res: any) => {
      if (res.data && res.data.length > 0) {
        this.proyecto = res.data[0];
        this.cdr.detectChanges();
      }
    });
  }

  obtenerTexto(bloques: any[]): string {
    if (!bloques || !Array.isArray(bloques)) return '';
    return bloques.map(b => b.children ? b.children.map((c: any) => c.text).join('') : '').join('\n');
  }
}