import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productList: IProduct[] = []; // <-- define the productList
  private _apiService = inject(ApiService);
  private _router = inject(Router);


  // injectar dependencias
  /* constructor(apiService: ApiService) {
    this.apiService = apiService;
  }*/


  // this method is called when the component is initialized
  ngOnInit(): void {
    // call the method getProducts() from the service
    this._apiService.getProducts().subscribe((data:IProduct[]) => {
      console.log(data)
      // assign the response to the productList
      this.productList = data;
    })
  }
  navegate(id:number):void {
    this._router.navigate(['/products', id]);
  }

}
