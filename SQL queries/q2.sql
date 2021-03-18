CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`user`
(
  `user_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT 1,
  PRIMARY KEY (`user_id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`role`
(
	`role_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`role_id`)
    /*
	KEY `fk_user_user_role` (`user_id`),
	CONSTRAINT `fk_user_user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
     */
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`user_role`
(
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT(20) NOT NULL,
    `role_id`BIGINT(20) NOT NULL,
    PRIMARY KEY (`id`)
    /*
	KEY `fk_user_user_role` (`user_id`),
	CONSTRAINT `fk_user_user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
     */
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

select * from `full-stack-ecommerce`.`user`;
select * from `full-stack-ecommerce`.`role`;
select * from `full-stack-ecommerce`.`user_role`;
# drop table `full-stack-ecommerce`.`role`;
SET SQL_SAFE_UPDATES=0;

insert into `full-stack-ecommerce`.`user` values(1, "kaustav", "abc123", 1);
insert into `full-stack-ecommerce`.`user` values(2, "elon", "xyz123", 1);
insert into `full-stack-ecommerce`.`role` values(1, "USER");
insert into `full-stack-ecommerce`.`role` values(2, "ADMIN");
insert into `full-stack-ecommerce`.`user_role` values(8, 5, 2);
insert into `full-stack-ecommerce`.`user_role` values(2, 1, 2);
insert into `full-stack-ecommerce`.`user_role` values(12, 7, 1);

CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`shopping_cart_test`
(
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT(20) NOT NULL,
    `product_id`BIGINT(20) NOT NULL,
    PRIMARY KEY (`id`),
	KEY `fk_user_cart` (`user_id`),
	CONSTRAINT `fk_user_cart` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    KEY `fk_user_product` (`product_id`),
	CONSTRAINT `fk_user_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

select * from `full-stack-ecommerce`.`role`;
SET SQL_SAFE_UPDATES=0;
delete from `full-stack-ecommerce`.`user` where user_id in (1, 2);
select * from `full-stack-ecommerce`.`user_role`;

insert into `full-stack-ecommerce`.`shopping_cart_test` values(1, 2, 1);
insert into `full-stack-ecommerce`.`shopping_cart_test` values(2, 2, 2);
insert into `full-stack-ecommerce`.`shopping_cart_test` values(3, 5, 2);
insert into `full-stack-ecommerce`.`shopping_cart_test` values(4, 5, 3);

select * from `full-stack-ecommerce`.`shopping_cart_test`;