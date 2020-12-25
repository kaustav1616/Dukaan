package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ShoppingCart;
import com.luv2code.ecommerce.entity.ShoppingCartTest;
import com.luv2code.ecommerce.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "shoppingCartTest", path = "shopping-cart-test")
public interface ShoppingCartRepositoryTest extends JpaRepository<ShoppingCartTest, Long>
{
    ShoppingCartTest findDistinctFirstByProductAndUser(Product product, User user);
    void deleteAllByUser(User user);
}