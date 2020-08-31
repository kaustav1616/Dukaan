package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShoppingCartController
{
    @Autowired
    private ProductRepository productRepository;

    private Product product;

    @PostMapping(value = "/addToCart/{id}")
    public void addToCart(@PathVariable("id") long id)
    {
        product = productRepository.findById(id);
        productRepository.save(product);
    }
}
