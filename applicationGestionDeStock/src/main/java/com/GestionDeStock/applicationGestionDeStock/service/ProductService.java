package com.GestionDeStock.applicationGestionDeStock.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionDeStock.applicationGestionDeStock.model.Product;
import com.GestionDeStock.applicationGestionDeStock.repository.ProductRepositry;


@Service
public class ProductService {
	@Autowired
    private ProductRepositry productRepository;

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }
    public Product createUser(Product product) {
        return productRepository.save(product);
    }
    public Optional<Product> getUserById(Long id) {
        return productRepository.findById(id);
    }
    public void deleteProduct(Long id) {
    		productRepository.deleteById(id);
    }
	public Optional<Product> getProductById(Long id) {
		return productRepository.findById(id);
	}
	
}
