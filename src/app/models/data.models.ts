export interface Programador {
  id: number;
  Nombre: string;
  Especialidad: string;
  Slug: string;
  Descripcion: string;
  Descripcion_completa: any[];
  Foto_perfil: any | null;
  Correo_contacto: string;
  Redes_sociales: {
    github?: string; 
    linkedin?: string;
  };
  Estado: boolean;
  proyectos: Proyecto[]; 
}

export interface Proyecto {
  id: number;
  Titulo: string;
  Slug: string;
  Imagen: any;
  Descripcion_breve: string;
  Descripcion_completa: any[];
  Tipo_proyecto: 'academico' | 'personal' | 'laboral' | 'simulado';
  Tecnologias: string[];
  Enlace_repo?: string | null;
  Enlace_demo?: string | null;
  Destacado: boolean;
}