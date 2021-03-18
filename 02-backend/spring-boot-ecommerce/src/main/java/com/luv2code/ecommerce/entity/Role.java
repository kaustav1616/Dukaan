package com.luv2code.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role")
@Getter
@Setter
public class Role
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    /*
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // fk in table is 'user_id' (refers to id in product_category)
    @JsonBackReference
    private User user;
     */

    /*
    @JsonIgnore
    private List<User> users;
     */

    @Column(name = "role")
    private String role;

    @ManyToMany(mappedBy = "roles")
    @JsonBackReference
    private List<User> users;
}