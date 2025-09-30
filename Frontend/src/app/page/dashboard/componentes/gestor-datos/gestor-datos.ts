import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestor-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestor-datos.html',
  styleUrls: ['./gestor-datos.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class GestorDatosComponent {

  @Input() users: Array<{ id: number; name: string; email: string }> = [];
  @Input() posts: Array<{ id: number; title: string; body: string }> = [];

}
