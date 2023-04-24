import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  @Input() product?: Product;
  @Input() onSubmit?: any;

  product_name = new FormControl('');
  description = new FormControl('');
  img = new FormControl('');
  access_token = new FormControl('');

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit() {
    if (this.product) {
      this.product_name.setValue(this.product.product_name);
      this.description.setValue(this.product.description);
      this.img.setValue(this.product.img);
    }
  }

  createProductObject() {
    if (this.product_name.value && this.description.value && this.img.value) {
      const product = {
        product_name: this.product_name.value,
        description: this.description.value,
        img: this.img.value,
      };

      return product;
    }

    return null;
  }
}
