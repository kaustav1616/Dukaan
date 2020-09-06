package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "shoppingCarts", path = "shopping-carts")
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long>
{
    ShoppingCart findById(long id);
    ShoppingCart findFirstByProduct(Product product);
}
