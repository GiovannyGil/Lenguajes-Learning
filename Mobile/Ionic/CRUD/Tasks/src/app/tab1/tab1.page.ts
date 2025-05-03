import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private http: HttpClient,
      public alertController: AlertController,
      private productosService: ProductosService,
      private router: Router
  ) { }


  // funcion para mostrar los datos por consola automaticamente

  // esto sirve para que cuando se entre a la vista se muestren los datos automaticamente
  // ionViewDidEnter() {
  //   this.getDatos(); // ña funcion que se va a ejecutar automaticamente
  // }

  ngOnInit() {
    // this.getDatos();
    this.getProducts();
  }

  // funcion para obtener los datos de la API
  // getDatos() {
  //   fetch(this.Api_url)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   });
  // }

  navigateToAddProduct() {
    this.router.navigate(['/products/new']);
    this.getProducts()
  }
  

  // funcion para traer todo los productos
  listaProductos: any = [];
  getProducts() {
    try {
      this.productosService.getProducts();
      this.productosService.productos$.subscribe(
        (data) => {
          this.listaProductos = data;
        }
      );
    } catch (error) {
      throw new Error('Ocurrio un error al listar los productos')
    }
  }

  // funcion para el modal
  isModalOpen = false;
  producto: any = {}; // Variable para almacenar la información del personaje seleccionado actualmente
  // funcion para abrir y cerrar el modal (Màs informacion de los personajes)
  
  
  setOpen(isOpen: boolean, productoID?: number) {
    try {
      this.isModalOpen = isOpen;
      if (productoID) {
        this.getProductById(productoID);
      }
    } catch (error) {
      throw new Error('Ocurrio un error al abrir el modal')
    }
  }

    // Funcion para obtener la informacion de un personaje en especifico (ID)
    getProductById(productoID: number) {
      try {
        this.productosService.getProductByID(productoID).subscribe(data => {
          this.producto = data;
        });
      } catch (error) {
        throw new Error('Ocurrio un error al buscar la informacion del producto')
      }
    }


    // configuracion de alerta para eliminar un producto
    // función para confirmar la eliminación del producto
    async confirmDelete(productoID: number) {
      try {
        const alert = await this.alertController.create({
          header: 'Confirmar eliminación',
          message: '¿Estás seguro de que deseas eliminar este producto?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Acción cancelada');
              }
            }, {
              text: 'Eliminar',
              handler: () => {
                this.deleteProduct(productoID);
              }
            }
          ]
        });
  
        await alert.present();
      } catch (error) {
        throw new Error('Ocurrio un error al procesar la alerta')
      }
    }

    // funcion para ir a la pagina de editar un producto
    navigateToUpdateProduct(id: number) {
      try {
        this.router.navigate(['/products/update', id]);
      } catch (error) {
        throw new Error('Ocurrio un error al eliminar')
      }
    }

    // funcion para eliminar un producto

    async deleteProduct(productoID: number) {
      try {
        this.productosService.deleteProduct(productoID).subscribe(
          () => {
            console.log('Producto eliminado exitosamente');
            this.getProducts();
          },
          (error) => {
            console.error('Error al eliminar el producto', error);
          }
        );
      } catch (error) {
        throw new Error('Ocurrio un error al eliminar')
      }
    }
}
