package com.luv2code.ecommerce.misc;

import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.entity.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class UserDetailsAuth implements UserDetails
{
    private String userName;
    private String password;
    private boolean active;
    private List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();

    public UserDetailsAuth(User user)
    {
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.active = user.isActive();
        List<Role> userRoleList = user.getRoles();

        // collecting all roles for retrieved user
        for(int i = 0; i < userRoleList.size(); ++i)
        {
            grantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_" + userRoleList.get(i).getRole()));
        }

        System.out.println("Granted authority list: " + grantedAuthorityList);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        return grantedAuthorityList;
    }

    @Override
    public String getPassword()
    {
        return password;
    }

    @Override
    public String getUsername()
    {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired()
    {
        return true;
    }

    @Override
    public boolean isAccountNonLocked()
    {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired()
    {
        return true;
    }

    @Override
    public boolean isEnabled()
    {
        return active;
    }
}