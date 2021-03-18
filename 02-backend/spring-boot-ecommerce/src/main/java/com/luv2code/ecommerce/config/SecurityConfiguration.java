package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.filter.JwtRequestFilter;
import com.luv2code.ecommerce.service.UserDetailsAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

// Class that is referred to by Spring Security
@EnableWebSecurity // automatically allows Spring to find and apply this class to Spring Security
@Component
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{
    @Autowired
    UserDetailsAuthenticationService userDetailsAuthenticationService;

    @Autowired
    JwtRequestFilter jwtRequestFilter;

    // Spring passes AuthenticationManagerBuilder and calls this overriden method (for authentication configuration)
    @Override
    protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception
    {
        /*
        // set custom configuration on object (using inMemoryAuthentication() right now for learning)
        authenticationManagerBuilder.inMemoryAuthentication()
                .withUser("kaustav").password("1234").roles("User").and()
                .withUser("abcd").password("abcd").roles("Admin");
         */

        authenticationManagerBuilder.userDetailsService(userDetailsAuthenticationService);
    }

    // Spring Security looks for bean of type PasswordEncoder to determine type of password encoding
    // Creates a bean and exposes it to Spring Security
    // note: DB password is not decoded; it is checked with encoded version of password provided by user during login.
    @Bean
    public PasswordEncoder getPasswordEncoder()
    {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception
    {
        return super.authenticationManagerBean();
    }

    // Spring passes HttpSecurity and calls this overriden method (for authorization configuration)
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception
    {
        httpSecurity.cors().and()
                .csrf().disable()
                .authorizeRequests()
                // .antMatchers("/api/products/**").permitAll()
                .antMatchers("/api/product-category/**").hasAnyRole("USER", "ADMIN").and().authorizeRequests()
                .antMatchers("/api/shopping-carts/**").hasAnyRole("USER", "ADMIN").and().authorizeRequests()
                .antMatchers("/api/products/**").hasAnyRole("USER", "ADMIN").and().authorizeRequests()
                .antMatchers("/login_test**").hasAnyRole("USER", "ADMIN").and().authorizeRequests()
                // .antMatchers("/api/product-category/**").hasAnyRole("USER", "ADMIN").and().authorizeRequests()
                // .antMatchers("/api/shopping-carts/**").hasAnyRole("USER", "ADMIN").and().authorizeRequests()
                .antMatchers("/api/users/**").hasRole("ADMIN").and().authorizeRequests()
                .antMatchers("/api/profile/**").hasRole("ADMIN").and().authorizeRequests()
                .antMatchers("/register").permitAll()
                .antMatchers( "/authenticate", "/logout_handle").permitAll()
                .antMatchers( "/login", "/logout").hasRole("ADMIN").and().authorizeRequests().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .httpBasic();

        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
 }

//public class SecurityConfiguration
//{
//
//}