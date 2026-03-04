export interface Ley {
  id: string;
  numero: string;
  nombre: string;
  descripcion: string;
  año: number;
  categoria: Categoria;
  estado: EstadoLey;
  motivoObsoleto: string;
  contextoHistorico: string;
  impactoActual: string;
  datosEconomicos: {
    dolarOficialEntonces: number;
    dolarBlueEntonces: number;
    dolarOficialAhora: number;
    dolarBlueAhora: number;
    inflacionAcumulada: number;
    ejemploConcreto: string;
  };
  tags: string[];
  fuente: string;
  enlace?: string;
}

export type Categoria = 
  | 'Impuestos' 
  | 'Monetaria' 
  | 'Comercial' 
  | 'Laboral' 
  | 'Penal' 
  | 'Administrativa' 
  | 'Salud' 
  | 'Educación' 
  | 'Transporte'
  | 'Otros';

export type EstadoLey = 'Vigente' | 'Derogada' | 'Modificada' | 'En revisión';

export interface Filtros {
  categoria?: Categoria;
  estado?: EstadoLey;
  añoDesde?: number;
  añoHasta?: number;
  search?: string;
  tags?: string[];
}