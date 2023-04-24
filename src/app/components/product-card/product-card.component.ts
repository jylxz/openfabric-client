import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product?: Product;
  menuOpen = false;

  constructor(private productsService: ProductsService) {}

  toggleMenu() {
    return (this.menuOpen = !this.menuOpen);
  }

  closeMenu() {
    return (this.menuOpen = false);
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  deleteProduct() {
    const accessToken = window.prompt("Please enter the access token!")

    this.product &&
      this.productsService
        .deleteProduct(this.product._id, accessToken || "")
        .subscribe();

    this.closeMenu();
  }
}
