import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspacioService, Espacio } from '../../../../../services/espacios/espacios.service';

@Component({
  selector: 'app-gestor-espacios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestor-datos.html',
  styleUrls: ['./gestor-datos.css']
})
export class GestorEspaciosComponent implements OnInit {
  espacios = signal<Espacio[]>([]);
  espacioForm!: FormGroup;
  modoEdicion = false;
  idSeleccionado: number | null = null;


  constructor(private fb: FormBuilder, private espacioService: EspacioService) {}

  ngOnInit(): void {
    this.espacioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      ubicacion: ['', Validators.required],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      estado: ['disponible', Validators.required]
    });

    this.cargarEspacios();
  }

  cargarEspacios(): void {
    this.espacioService.getEspacios().subscribe(data => this.espacios.set(data));
  }

  nuevoEspacio(): void {
    this.espacioForm.reset({ capacidad: 1, estado: 'disponible' });
    this.modoEdicion = false;
    this.idSeleccionado = null;
  }


  editarEspacio(espacio: Espacio): void {
    this.espacioForm.patchValue({
      nombre: espacio.nombre,
      ubicacion: espacio.ubicacion,
      capacidad: espacio.capacidad,
      estado: espacio.estado
    });
    this.modoEdicion = true;
    this.idSeleccionado = espacio.id!; 
  }

  guardarEspacio(): void {
    if (this.espacioForm.invalid) {
        alert('El formulario no es válido. Por favor, revisa los campos.');
        return;
    }

    const datosFormulario = this.espacioForm.value;

    if (this.modoEdicion && this.idSeleccionado !== null) {
      this.espacioService.actualizarEspacio(this.idSeleccionado, datosFormulario)
        .subscribe(() => {
            this.cargarEspacios();
            this.nuevoEspacio(); 
        });
    } else {
      this.espacioService.crearEspacio(datosFormulario)
        .subscribe(() => {
            this.cargarEspacios();
            this.nuevoEspacio(); 
        });
    }
  }

  eliminarEspacio(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este espacio?')) {
        this.espacioService.eliminarEspacio(id).subscribe(() => this.cargarEspacios());
    }
  }

  get nombre() { return this.espacioForm.get('nombre'); }
  get ubicacion() { return this.espacioForm.get('ubicacion'); }
  get capacidad() { return this.espacioForm.get('capacidad'); }
}

