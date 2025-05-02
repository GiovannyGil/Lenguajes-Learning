import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  private _route = inject(ActivatedRoute);
  // Assign the response to the product

  loading: boolean = true;
  // loading initial state in true

  product?: IProduct;
  // define the product (setear el producto)

  private _apiService = inject(ApiService);
  // inject the service ApiService

  // this method is called when the component is initialized
  ngOnInit(): void {
    // call the method getProductById() from the service
    this._route.params.subscribe(params => {

      // get the id from the params
      this._apiService.getProductById(params['id']).subscribe((data:IProduct) => {
        console.log(data)
        this.product = data;
        this.loading = false; // <-- change the loading state to false
      })
    })
  }


}
