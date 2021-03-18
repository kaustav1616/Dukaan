package com.luv2code.ecommerce.filter;

import com.luv2code.ecommerce.misc.UserDetailsAuth;
import com.luv2code.ecommerce.service.JwtUtil;
import com.luv2code.ecommerce.service.UserDetailsAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter
{
    @Autowired
    UserDetailsAuthenticationService userDetailsAuthenticationService;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
    {
        String authHeader = request.getHeader("Authorization");

        String userName = null;
        String jwt = null;

        if(authHeader != null && authHeader.startsWith("Bearer "))
        {
            jwt = authHeader.substring(7);
            userName = jwtUtil.extractUsername(jwt);
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            UserDetailsAuth userDetailsAuth = (UserDetailsAuth)this.userDetailsAuthenticationService.loadUserByUsername(userName);

            if(jwtUtil.validateToken(jwt, userDetailsAuth))
            {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetailsAuth, null, userDetailsAuth.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
