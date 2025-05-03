import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  // FUNCION PARA 
  async onSubmit() {
    try {
      console.log("Formulario enviado", this.productForm.value); // Depuración
      if (this.productForm.valid) {
  
        // Recuperar los datos del formulario
        const newProduct = this.productForm.value
        
        // comprobar si el producto ya existe
        const ProductExist = await this.checkIfProductExists(newProduct.nombre);
  
        if(ProductExist){
          // mostrar una alerta si el producto ya existe
          this.showAlert('Error', 'El producto ya existe, por favor acualiza la cantidad en stock');
          return;
        }
  
        const add = this.addProducto(this.productForm.value)
      }
    } catch (error) {
      throw new Error('Ocurrio un error al enviar el registro')
    }
  }

  async addProducto(product: any){
    try {
      const response = await this.productosService.addProduct(product).toPromise();
      console.log('Producto creado exitosamente', response);
      this.productosService.refreshProducts()
      this.router.navigate(['/tabs/tab1/']); // Redirigir a la página principal
    } catch (error) {
      console.error('Error al crear el producto (addProducto)', error);
    }
  
  }

// funcion para comprobar si el producto ya existe
async checkIfProductExists(nombre: string): Promise<any>{
  try {
    const products = await this.http.get<any[]>('http://localhost:3000/productos').toPromise();
    return products?.find(product => product.nombre.toLowerCase() === nombre.toLowerCase())
  } catch (error) {
    throw new Error('Ocurrio un error al checkear el producto')
  }
}


// fucion para mostrar una alerta
async showAlert(header: string, message: string){
try {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    })
  
    await alert.present()
} catch (error) {
  throw new Error('Ocurrio un error al generar la alerta')
}
}

  onCancel(){
    try {
      this.router.navigate(['/tabs/tab1']); // Redirigir a la página principal
    } catch (error) {
      throw new Error('Ocurrio un error al cerrar el modal')
    }
  }
}
