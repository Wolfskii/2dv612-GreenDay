SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `app` DEFAULT CHARACTER SET utf8 ;
USE `app` ;

-- -----------------------------------------------------
-- Table `app`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `address_id` INT NULL,
  `role` ENUM('admin', 'anon', 'customer', 'producer') NOT NULL,
  `is_blocked` TINYINT NOT NULL,
  `created_at` DATETIME NULL,
  `last_time_read` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Customer` (
  `customer_id` INT NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `address_id` INT NULL,
  `phone` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `customer_id_UNIQUE` (`customer_id` ASC) VISIBLE,
  FOREIGN KEY (`customer_id`)
  REFERENCES `app`.`User` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Producer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Producer` (
  `producer_id` INT NOT NULL,
  `org_nr` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`producer_id`, `org_nr`),
  UNIQUE INDEX `producer_id_UNIQUE` (`producer_id` ASC) VISIBLE,
  FOREIGN KEY (`producer_id`)
  REFERENCES `app`.`User` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Admin` (
  `admin_id` INT NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `admin_id_UNIQUE` (`admin_id` ASC) VISIBLE,
  FOREIGN KEY (`admin_id`)
  REFERENCES `app`.`User` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `producer_id` INT NOT NULL,
  `text` VARCHAR(500) NULL,
  `url` VARCHAR(400) NULL,
  `created_at` DATETIME,
  PRIMARY KEY (`message_id`),
    UNIQUE INDEX `message_id_UNIQUE` (`message_id` ASC) VISIBLE,
  FOREIGN KEY (`producer_id`)
  REFERENCES `app`.`Producer` (`producer_id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Subscription` (
  `user_id` INT NOT NULL,
  `producer_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) 
  REFERENCES `app`.`User` (`id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (`producer_id`) 
  REFERENCES `app`.`Producer` (`producer_id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(50) NULL,
  `number` VARCHAR(50) NULL,
  `postal_code` INT NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NULL,
  `care_of` VARCHAR(100) NULL,
  `box_address` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idAddress_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NULL,
  `created` DATE NULL,
  `updated` DATE NULL,
  `total` FLOAT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producer_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) NULL,
  `stock` INT NULL,
  `unit` VARCHAR(50) NULL,
  `image` LONGBLOB NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idProduct_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `producer_id_idx` (`producer_id` ASC) VISIBLE,
  FOREIGN KEY (`category_id`) REFERENCES `app`.`Category` (`id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (`producer_id`) REFERENCES `app`.`Producer` (`producer_id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Listing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Listing` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producer_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NULL,
  `price_per_unit` VARCHAR(50) NOT NULL,
  `min_quantity` INT NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_method` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  FOREIGN KEY (`product_id`) REFERENCES `app`.`Product` (`id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (`producer_id`) REFERENCES `app`.`Producer` (`producer_id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Order_Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Order_Item` (
  `order_id` INT NOT NULL,
  `listing_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  INDEX `order_id_idx` (`order_id` ASC) VISIBLE,
  INDEX `listing_id_idx` (`listing_id` ASC) VISIBLE,
  PRIMARY KEY (`order_id`, `listing_id`),
  FOREIGN KEY (`order_id`)
  REFERENCES `app`.`Order` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  FOREIGN KEY (`listing_id`)
  REFERENCES `app`.`Listing` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Category_Filter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Category_Filter` (
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `category_id`),
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  FOREIGN KEY (`user_id`)
  REFERENCES `app`.`Producer` (`producer_id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`)
  REFERENCES `app`.`Category` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`Product_Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`Product_Category` (
  `category_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`category_id`, `product_id`),
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  FOREIGN KEY (`category_id`)
  REFERENCES `app`.`Category` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`)
  REFERENCES `app`.`Product` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `app`.`User_Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `app`.`User_Order` (
  `user_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  PRIMARY KEY (`order_id`, `user_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  FOREIGN KEY (`user_id`)
  REFERENCES `app`.`User` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY (`order_id`)
  REFERENCES `app`.`Order` (`id`)
  ON DELETE CASCADE 
  ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Creation of mock categories
-- -----------------------------------------------------
INSERT INTO Category (name, description) VALUES ('Potatis','Olika sorters potatis');
INSERT INTO Category (name, description) VALUES ('Frukt','Olika sorters frukt');
INSERT INTO Category (name, description) VALUES ('Mejeri','Olika sorters mejeriprodukter');

-- -----------------------------------------------------
-- Creation of default Admin
-- username: admin
-- password: password123
-- -----------------------------------------------------
INSERT INTO User (username, password, email, role, is_blocked, created_at, last_time_read)
VALUES ('admin', '$2a$10$7yRpgjvwfBjA.3VQy3wuZuJqzFftG46Od7.AKvxsqKqDHqc6dT86C', 'admin@lokalagronsaker.se', 1, 0, '2020-12-31 23:59:59.000', '2020-12-31 23:59:59.000');

INSERT INTO Admin (admin_id)
VALUES (1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Creation of default Producer
-- username: producer
-- password: password123
-- -----------------------------------------------------
INSERT INTO User (username, password, email, role, is_blocked, created_at, last_time_read)
VALUES ('producer', '$2a$10$7yRpgjvwfBjA.3VQy3wuZuJqzFftG46Od7.AKvxsqKqDHqc6dT86C', 'producer@lokalagronsaker.se', 4, 0, '2020-12-31 23:59:59.000', '2020-12-31 23:59:59.000');

INSERT INTO Producer (producer_id, org_nr, name, description)
VALUES (2, '1234567890', 'Lokala producenten', 'En lokal handlare i Sverige');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Creation of default Customer
-- username: customer
-- password: password123
-- -----------------------------------------------------
INSERT INTO User (username, password, email, role, is_blocked, created_at, last_time_read)
VALUES ('customer', '$2a$10$7yRpgjvwfBjA.3VQy3wuZuJqzFftG46Od7.AKvxsqKqDHqc6dT86C', 'customer@lokalagronsaker.se', 3, 0, '2020-12-31 23:59:59.000', '2020-12-31 23:59:59.000');

INSERT INTO Customer (customer_id, first_name, last_name, phone)
VALUES (3, 'Fredrik', 'Reinfeldt', '0708123456');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
