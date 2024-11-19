package com.GestionDeStock.applicationGestionDeStock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GestionDeStock.applicationGestionDeStock.model.Product;

@Repository
public interface ProductRepositry extends JpaRepository<Product, Long>{

}
