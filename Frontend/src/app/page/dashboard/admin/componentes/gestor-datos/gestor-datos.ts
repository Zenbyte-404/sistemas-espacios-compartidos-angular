import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspaciosService } from '../../../../../services/espacios/espacios.service';

@Component({
  selector: 'app-gestor-espacios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestor-datos.html',
  styleUrls: ['./gestor-datos.css']
})
export class GestorEspaciosComponent implements OnInit {
  espacios = signal<any[]>([]);
  espacioForm!: FormGroup;        // 👈 este nombre debe coincidir con el HTML
  modoEdicion = false;
  idSeleccionado: number | null = null;

  constructor(private fb: FormBuilder, private espaciosService: EspaciosService) {}

  ngOnInit(): void {
    this.espacioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      ubicacion: ['', Validators.required],
      capacidad: [1, [Validators.required, Validators.min(1)]],
    });

    this.cargarEspacios();
  }

  cargarEspacios(): void {
    this.espaciosService.getEspacios().subscribe(data => this.espacios.set(data));
  }

  nuevoEspacio(): void {
    this.espacioForm.reset({ capacidad: 1 });
    this.modoEdicion = false;
    this.idSeleccionado = null;
  }

  editarEspacio(espacio: any): void {
    this.espacioForm.patchValue({
      nombre: espacio.nombre,
      ubicacion: espacio.ubicacion,
      capacidad: espacio.capacidad,
    });
    this.modoEdicion = true;
    this.idSeleccionado = espacio.id;
  }

  guardarEspacio(): void {
    if (this.espacioForm.invalid) return;

    const datos = this.espacioForm.value;

    if (this.modoEdicion && this.idSeleccionado !== null) {
      this.espaciosService.updateEspacio(this.idSeleccionado, datos)
        .subscribe(() => this.cargarEspacios());
    } else {
      this.espaciosService.createEspacio(datos)
        .subscribe(() => this.cargarEspacios());
    }
  }

  eliminarEspacio(id: number): void {
    this.espaciosService.deleteEspacio(id).subscribe(() => this.cargarEspacios());
  }

  // Getters para validaciones en el HTML
  get nombre() { return this.espacioForm.get('nombre'); }
  get ubicacion() { return this.espacioForm.get('ubicacion'); }
  get capacidad() { return this.espacioForm.get('capacidad'); }
}
