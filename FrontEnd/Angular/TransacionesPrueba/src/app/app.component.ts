import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { Transaccion } from './models/transaccion.model';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'TransacionesPrueba';

  transacionesList: Transaccion[] = []; // definir la lista de transacciones
  private _apiService = inject(ApiService);
  private _router = inject(Router);

  ngOnInit(): void {
    (this._apiService.getAllTransacciones()).subscribe((data : Transaccion[]) => {
      // console.log(data);
      this.transacionesList = data;
    })
  }

}
