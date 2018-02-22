# Welcome to Bamazon

## Overview
Bamazon is a simple command-line order desk application. Written for Node.js, bamazon utilizes npm packages for prompts (npm inquirer) and MySQL queries and functions (npm MYSQL). The current version includes two modules: Bamazon Customer is intended for use by customers to order products from available inventory and update inventory based on those orders. Bamazon Manager allows a user with manager access to view inventory, view low inventory, update inventory (add or remove as needed) and add new products. 

## Basic Application Flow - Bamazon Customer

On launch, Bamazon Customer first connects to the database and then presents a simple prompt to the customer:

  **"Would you like to place an order?"**

If the answer is *no*, Bamazon Customer displays a brief message and terminates the connection to the database. 

![Bamazon](images/bamazon0.PNG)

If the customer chooses to place an order, Bamazon Customer queries the database and displays all available products. Product information includes the item number, description, price and quantity available. Bamazon Customer then asks the customer to specify which item they would like to order and the quantity.

![Bamazon](images/bamazon1.PNG)

In this example, the customer is ordering 10 units of item number 1, Pencil. There are currently 70 Pencils available and they are priced at $1.00 per unit. 

After the order is completed by the customer, Bamazon Customer confirms that the order can be fulfilled by checking that the number of units ordered is lower than the available inventory. If so, Bamazon Customer confirms the order, displays an order summary and prompts the customer with the option to place another order. In the background, Bamazon Customer has reduced the inventory by the number of units in the order and stored the new inventory count in the database.

![Bamazon](images/bamazon2.PNG)

If the customer chooses to place another order, Bamazon Customer refreshes the product list (from the database) with the current available inventory of each item. In this case, the quantity of pencils is reduced from 70 to 60 as a result of the last order of 10 pencils.

Should the customer order more of an item than is avilable in current inventory, Bamazon Customer will display a message indicating the order cannot be fulfilled and again prompts the customer with the option to place another order. 

![Bamazon](images/bamazon3.PNG)

These prompts and orders continue until the customer chooses to not place an order. At that time, a final message is displayed and the database connection is terminated. 

![Bamazon](images/bamazon4.PNG)
