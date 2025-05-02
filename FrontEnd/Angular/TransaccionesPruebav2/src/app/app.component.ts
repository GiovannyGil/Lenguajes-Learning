import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { Transaccion } from './models/transaccion.model';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TransaccionesPruebav2';

  transacionesList: Transaccion[] = []; // definir la lista de transacciones

  constructor(private apiService: ApiService, private router: Router) {} // Inyecta los servicios en el constructor


  ngOnInit(): void {
    (this.apiService.getAllTransacciones()).subscribe((data : Transaccion[]) => {
      console.log(data);
      this.transacionesList = data;
    })
  }

}
