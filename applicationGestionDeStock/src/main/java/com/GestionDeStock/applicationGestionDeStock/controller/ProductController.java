package com.GestionDeStock.applicationGestionDeStock.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GestionDeStock.applicationGestionDeStock.service.ProductService;
import com.GestionDeStock.applicationGestionDeStock.model.Product;

@RestController
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	 @GetMapping("/products")
	    public List<Product> getProducts() {
	        return productService.getAllProduct();
	    }
	 
	 @PostMapping("/products")
	    public Product createProduct(@RequestBody Product product) {
	        return productService.createUser(product);
	    }
	 
	 @PutMapping("/products/{id}")
	    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
	        Optional<Product> existingProduct = productService.getProductById(id);
	        if (existingProduct.isPresent()) {
	        	Product updatedProduct = existingProduct.get();
	        	updatedProduct.setName(product.getName());
	        	updatedProduct.setQuantity(product.getQuantity());
	            return ResponseEntity.ok(productService.createUser(updatedProduct));
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	 
	 @DeleteMapping("/products/{id}")
	    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
	        if (productService.getProductById(id).isPresent()) {
	        	productService.deleteProduct(id);
	            return ResponseEntity.noContent().build();
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	 
	 @GetMapping("/users/{id}")
	    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
	        Optional<Product> product = productService.getProductById(id);
	        if (product.isPresent()) {
	            return ResponseEntity.ok(product.get());
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
}
