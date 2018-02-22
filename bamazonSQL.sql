**************************************
bamazon

DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30),
	price INTEGER(5),
	stock_quantity INTEGER(5),
	PRIMARY KEY(id)
);

USE bamazon_db;

UPDATE products
SET price=100
WHERE product_name="Pencil";
SELECT * FROM products;

USE bamazon_db;

UPDATE products
SET stock_quantity=100
WHERE product_name="Pencil";
SELECT * FROM products;

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Pencil", 25, 100);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Molskine Notpad", 525, 25);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Fountain Pen", 10000, 10);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Large Binder Clips", 250, 50);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Small Binder Clips", 200, 100);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Stapler, Red", 1050, 15);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Ink Refill, Blue", 350, 30);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Note Cards, 3x5", 150, 36);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Sharpie, Black 4 Pack", 500, 48);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Binder, 3 ring", 175, 60);
INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Printer Paper, Reem", 1075, 24);

SELECT * FROM products;

SELECT * FROM products
WHERE id = 3

SELECT * FROM products
WHERE stock_quantity < 50;
