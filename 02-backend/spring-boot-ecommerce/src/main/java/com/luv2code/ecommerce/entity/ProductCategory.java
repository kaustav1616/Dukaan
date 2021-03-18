package com.luv2code.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
<<<<<<< HEAD
@Table(name = "product_category")
=======
@Table(name="product_category")
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
@Getter
@Setter
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category") // referencing variable in referencing table is 'category'
    @JsonManagedReference
<<<<<<< HEAD
    // @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Product> products;
=======
    private Set<Product> products;

>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
}







