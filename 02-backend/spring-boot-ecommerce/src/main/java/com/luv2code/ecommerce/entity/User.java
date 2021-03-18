package com.luv2code.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    @Column(name = "user_name", unique = true)
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "active")
    private boolean active;

    /*
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user") // referencing variable in referencing table is 'user'
    @JsonManagedReference
    private List<UserRole> roles;
     */

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    @JsonManagedReference
    private List<Role> roles;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "shopping_cart_test",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id")})
    private List<Product> shoppingCartProducts;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user") // referencing variable in referencing table is 'user'
    @JsonManagedReference
    // @LazyCollection(LazyCollectionOption.FALSE)
    private List<Order> orders;
}