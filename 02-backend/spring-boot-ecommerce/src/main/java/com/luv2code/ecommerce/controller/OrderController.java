package com.luv2code.ecommerce.controller;

// import com.luv2code.ecommerce.dao.OrderProductRepository;
import com.luv2code.ecommerce.dao.OrderRepository;
import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.dao.ShoppingCartRepositoryTest;
import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.*;
import com.luv2code.ecommerce.misc.UserDetailsAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController
{
    @Autowired
    UserRepository userRepository;

    @Autowired
    ShoppingCartRepositoryTest shoppingCartRepositoryTest;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;


    @PostMapping(value = "/createOrder")
    @Transactional
    public void orderProducts(@AuthenticationPrincipal UserDetailsAuth userDetailsAuth)
    {
        List<Product> shoppingCartProducts = new ArrayList<>();
        List<Product> newShoppingCartProducts = new ArrayList<>();

        // Step 1: Get logged in user.
        Optional<User> user = userRepository.findUserByUserName(userDetailsAuth.getUsername());

        if(!user.isPresent())
            return;

        // Step 2: Get shopping cart products
        shoppingCartProducts = user.get().getShoppingCartProducts();

        // Step 3: Calculate total amount
        int countProducts = shoppingCartProducts.size();
        BigDecimal orderAmount = new BigDecimal("0.00");

        for(int i = 0; i < countProducts; ++i)
        {
            orderAmount = orderAmount.add(shoppingCartProducts.get(i).getUnitPrice());

            // using a different Product object than the one present in User object to prevent: "error: Found shared references to a collection: .."
            Optional<Product> product = productRepository.findById(shoppingCartProducts.get(i).getId());
            newShoppingCartProducts.add(product.get());
        }

        // Step 4: Create new Order object and save in DB
        Order order = new Order();

        order.setUser(user.get());
        order.setProducts(newShoppingCartProducts);
        order.setAmount(orderAmount);
        orderRepository.save(order);
        orderRepository.flush();

        // Step 5: Empty Shopping cart
        shoppingCartRepositoryTest.deleteAllByUser(user.get());
    }

    @GetMapping(value = "/getOrders")
    public List<Order> getOrders(@AuthenticationPrincipal UserDetailsAuth userDetailsAuth)
    {
        List<Order> userOrders = new ArrayList<>();
        Optional<User> user = userRepository.findUserByUserName(userDetailsAuth.getUsername());

        if(!user.isPresent())
            return userOrders;

        userOrders = orderRepository.findByUser(user.get());
        return userOrders;
    }
}