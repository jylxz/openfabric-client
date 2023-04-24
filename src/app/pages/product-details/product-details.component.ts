import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  id: string | null = null;
  product?: Product = undefined;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProduct();
  }

  getProduct(): void {
    this.id &&
      this.productsService.getProduct(this.id).subscribe((product) => {
        this.product = product;
        this.title.setTitle(`OpenFabric | ${product.product_name}`);
      });
  }
}
