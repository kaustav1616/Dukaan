package com.luv2code.ecommerce.misc;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUser
{
    private long id;

    private String userName;

    private String password;

    private boolean active;

    private String jwt;
}
