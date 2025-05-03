import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.scss'],
})
export class ProductUpdateFormComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  productId: number;
  // private apiUrl = 'https://6655-138-121-15-30.ngrok-free.app'
  private apiUrl = 'http://localhost:3000';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private productosService: ProductosService
  ) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    try {
      this.productForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        stock: ['', Validators.required],
      });
  
      this.loadProductData();
    } catch (error) {
      throw new Error('Error al validar el formulario')
    }
  }

  loadProductData() {
    try {
      this.http.get(`${this.apiUrl}/productos/${this.productId}`).subscribe((data: any) => {
        this.productForm.patchValue(data);
      });
    } catch (error) {
      throw new Error('Error al actualizar')
    }
  }

  onSubmit() {
    try {
      if (this.productForm.valid) {
        this.productosService.updateProduct(this.productId, this.productForm.value).subscribe(
          () => {
            console.log("Producto actualizado exitosamente");
            this.productosService.refreshProducts()
            this.router.navigate(['/tabs/tab1']); // Redirigir a la página principal
          },
          (error) => {
            console.error('Error al actualizar el producto', error);
          }
        )
      }
    } catch (error) {
      throw new Error('Error al enviar la informacion')
    }
  }

  onCancel() {
    try {
      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      throw new Error('Error al volver al inicio')
    }
  }
}
