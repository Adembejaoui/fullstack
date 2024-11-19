import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value as Product;
      this.productService.createProduct(product).subscribe({
        next: (response) => {
          console.log('product created:', response);
          this.snackBar.open('product created successfully!', 'Close', { duration: 3000 });
          this.productForm.reset();
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.snackBar.open('Error creating product. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
  
} 