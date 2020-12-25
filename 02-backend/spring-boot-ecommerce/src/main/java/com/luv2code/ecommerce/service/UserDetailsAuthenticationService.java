package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.misc.UserDetailsAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// interacts with JPA to return UserDetails object (which is eventually transformed into 'Principal' object and used for Authentication)
@Service
public class UserDetailsAuthenticationService implements UserDetailsService
{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Optional<User> user = userRepository.findUserByUserName(username);
        user.orElseThrow(() -> new UsernameNotFoundException("not found: " + username));

        // create UserDetails object based on user data received from JPA service and return it
        return user.map(UserDetailsAuth::new).get();
    }
}