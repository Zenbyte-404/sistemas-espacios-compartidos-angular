import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-objetivo',
  standalone: true,
  imports: [Header, Footer,RouterModule],
  templateUrl: './objetivo.html',
  styleUrl: './objetivo.css'
})
export class Objetivo {}