package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long>
{
    List<Order> findByUser(User user);
}