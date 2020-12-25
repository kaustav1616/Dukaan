package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long>
{
}