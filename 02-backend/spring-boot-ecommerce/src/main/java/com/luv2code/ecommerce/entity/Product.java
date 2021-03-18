package com.luv2code.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
=======
import lombok.Data;
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
<<<<<<< HEAD
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product
{
=======

@Entity
@Table(name="product")
@Data
public class Product {

>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false) // fk in table is 'category_id' (refers to id in product_category)
    @JsonBackReference
    private ProductCategory category;

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

    /*
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    @JsonManagedReference
    private Set<ShoppingCart> ShoppingCartProductInstances;
<<<<<<< HEAD
     */
}
=======

     */
}
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
