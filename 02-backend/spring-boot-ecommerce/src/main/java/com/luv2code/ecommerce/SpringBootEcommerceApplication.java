package com.luv2code.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

<<<<<<< HEAD
<<<<<<< HEAD
// @SpringBootApplication(exclude = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
=======
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
@SpringBootApplication
public class SpringBootEcommerceApplication {

	public static void main(String[] args)
	{
=======
@SpringBootApplication
public class SpringBootEcommerceApplication {

	public static void main(String[] args) {
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
		SpringApplication.run(SpringBootEcommerceApplication.class, args);
	}

}