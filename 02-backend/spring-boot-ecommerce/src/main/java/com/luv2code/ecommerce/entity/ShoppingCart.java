package com.luv2code.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
<<<<<<< HEAD
import lombok.Getter;
import lombok.Setter;
=======
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
<<<<<<< HEAD
@Table(name = "shopping_cart")
@Data
@Getter
@Setter
=======
@Table(name="shopping_cart")
@Data
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
public class ShoppingCart
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prod_id", nullable = false)
    @JsonBackReference
    private Product product;

    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    // @Column(name = "category_id")
    // private Long categoryId;
}
