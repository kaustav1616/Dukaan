package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.dao.ShoppingCartRepository;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShoppingCartController
{
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    private Product product;
    boolean isRemoved;
    private ShoppingCart shoppingCart = new ShoppingCart();
    private ShoppingCart savedShoppingCart;

    @PostMapping(value = "/addToCart/{id}")
    public ResponseEntity<ShoppingCart> addToCart(@PathVariable(value = "id") Long id)
    {
        product = productRepository.findById(id.longValue());
        shoppingCart.setProduct(product);
        shoppingCart.setSku(product.getSku());
        shoppingCart.setName(product.getName());
        shoppingCart.setDescription(product.getDescription());
        shoppingCart.setUnitPrice(product.getUnitPrice());
        shoppingCart.setImageUrl(product.getImageUrl());
        shoppingCart.setUnitsInStock(product.getUnitsInStock());
        shoppingCart.setDateCreated(product.getDateCreated());
        shoppingCart.setLastUpdated(product.getLastUpdated());
        shoppingCart.setCategoryId(product.getCategory().getId());
        savedShoppingCart = shoppingCartRepository.save(shoppingCart);
        return ResponseEntity.ok(savedShoppingCart);
    }

    @DeleteMapping(value = "/removeFromCart/{id}")
    public void removeFromCart(@PathVariable(value = "id") Long id)
    {
        savedShoppingCart = shoppingCartRepository.findById(id.longValue());
        shoppingCartRepository.delete(savedShoppingCart);
    }
}