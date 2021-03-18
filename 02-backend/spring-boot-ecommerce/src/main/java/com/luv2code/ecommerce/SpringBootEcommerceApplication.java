package com.luv2code.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication(exclude = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
@SpringBootApplication
public class SpringBootEcommerceApplication
{

	public static void main(String[] args)
	{
		SpringApplication.run(SpringBootEcommerceApplication.class, args);
	}

}