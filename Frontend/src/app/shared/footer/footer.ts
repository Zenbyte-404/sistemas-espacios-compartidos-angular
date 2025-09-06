import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,            // <- necesario para usarlo en imports
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']   // <- corregido styleUrls
})
export class Footer {}
