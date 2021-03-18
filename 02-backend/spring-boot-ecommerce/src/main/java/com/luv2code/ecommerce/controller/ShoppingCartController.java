package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.dao.ShoppingCartRepository;
<<<<<<< HEAD
import com.luv2code.ecommerce.dao.ShoppingCartRepositoryTest;
import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ShoppingCart;
import com.luv2code.ecommerce.entity.ShoppingCartTest;
import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.misc.UserDetailsAuth;
import com.luv2code.ecommerce.misc.UserShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

=======
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShoppingCartController
{
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

<<<<<<< HEAD
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShoppingCartRepositoryTest shoppingCartRepositoryTest;

=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    private Product product;
    boolean isRemoved;
    private ShoppingCart shoppingCart;
    private ShoppingCart savedShoppingCart;

<<<<<<< HEAD
    @GetMapping(value = "/api/getShoppingCart")
    public List<UserShoppingCart> getShoppingCart(@AuthenticationPrincipal UserDetailsAuth userDetailsAuth) // injects current logged in user
    {
        int i, n;
        List<Product> shoppingCart = new ArrayList<>();
        List<UserShoppingCart> finalShoppingCart = new ArrayList<>();

        Optional<User> user = userRepository.findUserByUserName(userDetailsAuth.getUsername());

        if(!user.isPresent())
            return finalShoppingCart;

        shoppingCart = user.get().getShoppingCartProducts();
        n = shoppingCart.size();

        for(i = 0; i < n; ++i)
        {
            Product product = shoppingCart.get(i);
            UserShoppingCart userShoppingCartProduct = new UserShoppingCart();

            userShoppingCartProduct.setId((long)i);
            userShoppingCartProduct.setProduct(product);
            userShoppingCartProduct.setSku(product.getSku());
            userShoppingCartProduct.setName(product.getName());
            userShoppingCartProduct.setDescription(product.getDescription());
            userShoppingCartProduct.setImageUrl(product.getImageUrl());
            userShoppingCartProduct.setUnitPrice(product.getUnitPrice());
            userShoppingCartProduct.setUnitsInStock(product.getUnitsInStock());
            userShoppingCartProduct.setDateCreated(product.getDateCreated());
            userShoppingCartProduct.setLastUpdated(product.getLastUpdated());

            finalShoppingCart.add(userShoppingCartProduct);
        }

        return finalShoppingCart;
    }

    @PostMapping(value = "/api/addToCart/{id}")
    public void addToCart(@PathVariable(value = "id") Long id, @AuthenticationPrincipal UserDetailsAuth userDetailsAuth)
    {
        ShoppingCartTest shoppingCartProduct = new ShoppingCartTest();
        Optional<User> user = userRepository.findUserByUserName(userDetailsAuth.getUsername());

        if(!user.isPresent())
            return;

        Product product = productRepository.findById(id.longValue()); // getting the product to be inserted into cart from 'Product table'

        shoppingCartProduct.setUser(user.get());
        shoppingCartProduct.setProduct(product);
        shoppingCartRepositoryTest.save(shoppingCartProduct);
    }

    /*
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    @PostMapping(value = "/addToCart/{id}")
    public void addToCart(@PathVariable(value = "id") Long id)
    {
        shoppingCart = new ShoppingCart();
        product = productRepository.findById(id.longValue()); // getting the product to be inserted into cart from 'Product table'

<<<<<<< HEAD
        // setting the details of the new record to insert
=======
        /* setting the details of the new record to insert */
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
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
<<<<<<< HEAD
     */

    /*
    @DeleteMapping(value = "/removeFromCart/{id}")
    public void removeFromCart(@PathVariable(value = "id") Long id) // 'id' is product id, not shopping cart id
    {
        ShoppingCart savedShoppingCart;

        savedShoppingCart = shoppingCartRepository.findById(id.longValue());
        shoppingCartRepository.delete(savedShoppingCart);
    }
     */

    @DeleteMapping(value = "/api/removeFromCart/{id}")
    public void removeFromCart(@PathVariable(value = "id") Long id, @AuthenticationPrincipal UserDetailsAuth userDetailsAuth) // 'id' is product id, not shopping cart id
    {
        Optional<User> user = userRepository.findUserByUserName(userDetailsAuth.getUsername());

        if(!user.isPresent())
            return;

        Product product = productRepository.findById(id.longValue()); // getting the product to be inserted into cart from 'Product table'

        ShoppingCartTest shoppingCartProduct = shoppingCartRepositoryTest.findDistinctFirstByProductAndUser(product, user.get());
        shoppingCartRepositoryTest.delete(shoppingCartProduct);
    }
=======

    @DeleteMapping(value = "/removeFromCart/{id}")
    public void removeFromCart(@PathVariable(value = "id") Long id)
    {
        product = productRepository.findById(id.longValue());
        savedShoppingCart = shoppingCartRepository.findFirstByProduct(product);
        shoppingCartRepository.delete(savedShoppingCart);
    }
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
}