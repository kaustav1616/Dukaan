package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@Repository
@CrossOrigin("http://localhost:4200")
public interface RoleRepository extends JpaRepository<Role,Long>
{
    Role findRoleByRole(String role);
}
