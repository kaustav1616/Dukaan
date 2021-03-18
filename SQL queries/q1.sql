-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`shopping_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`shopping_cart` 
(
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `prod_id`  BIGINT(20),
  `sku` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT 1,
  `units_in_stock` INT(11) DEFAULT NULL,
  `date_created` DATETIME(6) DEFAULT NULL,
  `last_updated` DATETIME(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product` (`prod_id`),
  CONSTRAINT `fk_product` FOREIGN KEY (`prod_id`) REFERENCES `product` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

SET SQL_SAFE_UPDATES=0;
delete from `full-stack-ecommerce`.`shopping_cart`;
select * FROM `full-stack-ecommerce`.`shopping_cart`;
select * FROM `full-stack-ecommerce`.`product`;

