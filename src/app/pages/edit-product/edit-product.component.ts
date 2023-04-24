import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NewProduct } from 'src/app/interfaces/newProduct';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  @Input() product?: Product;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {}

  id = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (!this.product && this.id) {
      this.productsService.getProduct(this.id).subscribe((product) => {
        this.product = product;
        this.title.setTitle(`OpenFabric | Edit ${this.product.product_name}`);
      });
    } else {
      this.title.setTitle(`OpenFabric | Edit ${this.product?.product_name}`);
    }
  }

  onSubmit(updateProduct: NewProduct | null, accessToken: string) {
    if (updateProduct) {
      this.productsService
        .updateProduct(this.product!._id, updateProduct, accessToken)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
