package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.dao.ShoppingCartRepository;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShoppingCartController
{
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    private Product product;
    boolean isRemoved;
    private ShoppingCart shoppingCart;
    private ShoppingCart savedShoppingCart;

    @PostMapping(value = "/addToCart/{id}")
    public void addToCart(@PathVariable(value = "id") Long id)
    {
        shoppingCart = new ShoppingCart();
        product = productRepository.findById(id.longValue()); // getting the product to be inserted into cart from 'Product table'

        /* setting the details of the new record to insert */
        shoppingCart.setProduct(product);
        shoppingCart.setSku(product.getSku());
        shoppingCart.setActive(true);
        shoppingCart.setName(product.getName());
        shoppingCart.setDescription(product.getDescription());
        shoppingCart.setUnitPrice(product.getUnitPrice());
        shoppingCart.setImageUrl(product.getImageUrl());
        shoppingCart.setUnitsInStock(product.getUnitsInStock());
        shoppingCart.setDateCreated(product.getDateCreated());
        shoppingCart.setLastUpdated(product.getLastUpdated());
        savedShoppingCart = shoppingCartRepository.save(shoppingCart);
    }

    @DeleteMapping(value = "/removeFromCart/{id}")
    public void removeFromCart(@PathVariable(value = "id") Long id)
    {
        product = productRepository.findById(id.longValue());
        savedShoppingCart = shoppingCartRepository.findFirstByProduct(product);
        shoppingCartRepository.delete(savedShoppingCart);
    }
}