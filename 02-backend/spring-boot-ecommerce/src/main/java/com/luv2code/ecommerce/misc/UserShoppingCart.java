package com.luv2code.ecommerce.misc;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.luv2code.ecommerce.entity.Product;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.context.annotation.Bean;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class UserShoppingCart
{
    private Long id;

    private Product product;

    private String sku;

    private String name;

    private String description;

    private BigDecimal unitPrice;

    private String imageUrl;

    private boolean active;

    private int unitsInStock;

    private Date dateCreated;

    private Date lastUpdated;
}