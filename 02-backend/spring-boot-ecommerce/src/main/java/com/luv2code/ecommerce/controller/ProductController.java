package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController
{
    @Autowired
    private ProductRepository productRepository;

    @GetMapping(value = "/api/products")
    public List<Product> getProducts()
    {
        return productRepository.findAll();
    }

    @GetMapping(value = "/api/products/search/findByCategoryId?id={category_id}")
    public List<Product> getProductByCategoryId(@PathVariable(name = "category_id") long category_id)
    {
        return productRepository.findByC(category_id);
    }
}
