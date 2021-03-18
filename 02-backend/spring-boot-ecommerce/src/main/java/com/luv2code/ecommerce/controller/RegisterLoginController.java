package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dao.RoleRepository;
import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.Role;
import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.misc.AuthenticationRequest;
import com.luv2code.ecommerce.misc.LoginUser;
import com.luv2code.ecommerce.misc.UserDetailsAuth;
import com.luv2code.ecommerce.service.JwtUtil;
import com.luv2code.ecommerce.service.UserDetailsAuthenticationService;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterLoginController
{
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsAuthenticationService userDetailsAuthenticationService;

    @Autowired
    JwtUtil jwtUtil;

    /* Login with JPA (commented on 6/1/2020)
    @GetMapping(value = "/login")
    public LoginUser login(@AuthenticationPrincipal UserDetailsAuth userDetailsAuth)
    {
        LoginUser loginUser = new LoginUser();

        Optional<User> user = userRepository.findUserByUserName(userDetailsAuth.getUsername());
        loginUser.setId(user.get().getId());
        loginUser.setUserName(user.get().getUserName());
        loginUser.setPassword(user.get().getPassword());
        loginUser.setActive(true);

        return loginUser;
    }
     */

    @PostMapping(value = "/authenticate")
    public LoginUser createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
    {
        try
        {
            authenticationManager.authenticate
                    (new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(), authenticationRequest.getPassword()));
        }
        catch (BadCredentialsException e)
        {
            return null;
        }

        UserDetailsAuth userDetailsAuth = (UserDetailsAuth)userDetailsAuthenticationService.loadUserByUsername(authenticationRequest.getUserName());

        String jwt = jwtUtil.generateToken(userDetailsAuth);

        LoginUser loginUser = new LoginUser();

        Optional<User> user = userRepository.findUserByUserName(userDetailsAuth.getUsername());
        loginUser.setId(user.get().getId());
        loginUser.setUserName(user.get().getUserName());
        loginUser.setPassword(user.get().getPassword());
        loginUser.setActive(true);
        loginUser.setJwt(jwt);
        return loginUser;
    }

    @GetMapping(value = "/login_test")
    public String loginTest()
    {
        return ("Login test successful");
    }

    @GetMapping(value = "/logout_handle")
    public String logout(HttpServletRequest request, HttpServletResponse response)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

//        if(auth == null)
//            return ("User not logged in.");

        if(auth instanceof AnonymousAuthenticationToken) // check for not logged in user (anonymous user)
            return ("User not logged in.");

        new SecurityContextLogoutHandler().logout(request, response, auth);
//        SecurityContextHolder.getContext().setAuthentication(null);
        System.out.println("Logged out.");
        return ("Logout successful.");
    }

    @PostMapping(value = "/register")
    public String register(@RequestParam("userName") String userName, @RequestParam("password") String password)
    {
        Optional<User> user = userRepository.findUserByUserName(userName);
        System.out.println("User: " + user);

        if(user.isPresent())
            return ("User name already exists. Choose another user name.");

        // create new user object with role = "USER"
        List<Role> roles = new ArrayList<>();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12); // Slow Hashing based password encoding

        Role userRole = roleRepository.findRoleByRole("USER");
        roles.add(userRole);

        User newUser = new User();
        newUser.setUserName(userName);
        String encodedPassword = encoder.encode(password);
        newUser.setPassword(encodedPassword);
        newUser.setActive(true);
        newUser.setRoles(roles);

        userRepository.save(newUser);
        return ("User registered successfully");
    }
}