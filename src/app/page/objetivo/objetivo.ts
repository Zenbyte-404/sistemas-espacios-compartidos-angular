import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-objetivo',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './objetivo.html',
  styleUrls: ['./objetivo.css'] // Corrección: debe ser styleUrls (plural)
})
export class Objetivo {}