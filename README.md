# bamazon

Welcome to Bamazon

Bamazon-Customer is an INQUIRER-driven command line order desk utilizing MYSQL for data storage. 

The basic workflow of bamazonCustomer.js is as follows:

On launch, bamazon connects to the MYSQL database and presents a simple prompt: "Would you like to place an order?"

If the answer is no, bamazon displays a brief message and terminates the connection to the database. 

![Bamazon0](images/bamazon0.png)

If the customer chooses to place an order, bamazon queries the database and displays all available products. Product information includes the item number, description, price and quantity available. Bamazon then asks the customer to specify which item they would like to order and the quantity.  

In this example, the customer is ordering 10 units of item number 1, Pencil. There are currently 70 Pencils available and they are priced at $1.00 per unit. 

/// INSERT IMAGE 1 

After the order is completed by the customer, bamazon confirms that the order can be fulfilled by checking that the number of units ordered is lower than the available inventory. If so, then bamazon confirms the order, displays an order summary and prompts the customer with the option to place another order. In the background, bamazon has reduced the inventory by the number of units in the order and stored the new inventory count in the database.

/// INSERT IMAGE 2

If the customer chooses to place another order, bamazon refreshes the product list (reading from the database) with the current available inventory of each item. In this case, the quantity of pencils is reduced from 70 to 60 as a result of the last order of 10 pencils.

Should the customer order more of an item than is avilable in current inventory, bamazon will display a message indicating the order cannot be fulfilled and again prompts the customer with the option to place another order. 

/// INSERT IMAGE 3

These prompts and orders continue until the customer chooses to not place an order. At that time, a final message is displayed and the database connection is terminated. 

/// INSERT IMAGE 4
