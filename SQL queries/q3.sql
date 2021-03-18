

CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`orders` 
(
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id`  BIGINT(20),
  `amount` DECIMAL(13,2) DEFAULT NULL,
  `order_date` DATETIME(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user_orders` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

insert into `full-stack-ecommerce`.`order`(id, amount, order_date, user_id) values (1, 65.96, '2020-12-25 13:23:45.582', 5);
SET SQL_SAFE_UPDATES=0;
delete from orders;
select * from orders;
select * from user;
select * from `full-stack-ecommerce`.`order_product`;

CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`order_product` 
(
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `order_id`  BIGINT(20),
  `product_id`  BIGINT(20),
  PRIMARY KEY (`id`),
  KEY `fk_order` (`order_id`),
  CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  KEY `fk_product_order` (`product_id`),
  CONSTRAINT `fk_product_order` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;