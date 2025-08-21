import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Objetivo } from './page/objetivo/objetivo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,Objetivo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sistemas-compartidos-angular');
}
