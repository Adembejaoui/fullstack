import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  productId: number | null = null; // Stores the ID for edit mode
  isEditMode = false; // Tracks whether we're editing or creating

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute, // For reading route parameters
    private router: Router // For navigation
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  private checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id']; // Convert ID to a number
        this.loadProduct(this.productId);
      }
    });
  }

  private loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product); // Populate the form with product data
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.snackBar.open('Error loading product. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = { ...this.productForm.value, id: this.productId }; // Include ID if editing
      if (this.isEditMode) {
        this.productService.updateProduct(product).subscribe({
          next: (response) => {
            console.log('Product updated:', response);
            this.snackBar.open('Product updated successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/products']); // Redirect to product list
          },
          error: (error) => {
            console.error('Error updating product:', error);
            this.snackBar.open('Error updating product. Please try again.', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.productService.createProduct(product).subscribe({
          next: (response) => {
            console.log('Product created:', response);
            this.snackBar.open('Product created successfully!', 'Close', { duration: 3000 });
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
}
