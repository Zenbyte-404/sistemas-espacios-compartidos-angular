import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/header/header';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
