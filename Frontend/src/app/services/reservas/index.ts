export interface Espacio {
  id: number;
  nombre: string;
  // Agrega aquí otros campos que necesites del espacio
}


export interface Reserva {
  id: number;
  espacio: Espacio;
usuario_nombre: string;
  fecha_reserva: string; 
  hora_inicio: string; 
  hora_fin: string; 
  estado: 'CONFIRMADA' | 'PENDIENTE' | 'CANCELADA';
  fecha_creacion: string; 
}

export interface NuevaReserva {
  espacio_id: number;
  fecha_reserva: string;
  hora_inicio: string;
  hora_fin: string;
}
