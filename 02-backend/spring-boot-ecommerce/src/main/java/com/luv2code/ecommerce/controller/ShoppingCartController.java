package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShoppingCartController
{
    @Autowired
    private ProductRepository productRepository;

    private Product product;

    @PostMapping(value = "/addToCart")
    public void addToCart(@RequestParam("id") Long id)
    {
        product = productRepository.findById(id);
        productRepository.save(product);
    }
}
