import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NewProduct } from 'src/app/interfaces/newProduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  onSubmit(product: NewProduct | null, accessToken: string) {
    if (product) {
      this.productsService.addProduct(product, accessToken).subscribe(() => {
        this.router.navigate(['']).catch((e) => console.log(e));
      });
    }
  }
}
