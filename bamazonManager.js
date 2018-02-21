//bamazon
//manager view
// USE bamazon_db;
var inquirer = require("inquirer")
var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

console.log("---------- Welcome to Bamazon ----------")
console.log("-------- You are in Manager mode -------")
console.log("")
inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["See All Products", "View Low Inventory", "Add to Inventory", "Add New Product"],
      name: "action"
    }
]).then(function(response) {
	if (response.action == "View Low Inventory") {
		console.log("")
		console.log("View Low Inventory. ")
		console.log("")
	} else if (response.action == "Add to Inventory") {
		console.log("")
		console.log("FUNCTION: Add to Inventory. ")
		console.log("")
		inquirer.prompt([
		    {
		      type: "input",
		      message: "What product would you like to update?",
		      name: "productID"
		    },
			{
		      type: "input",
		      message: "What is the quantity added?",
		      name: "quantityAdded"
		    }
		]).then(function(response) {
			var newQuantity = 0
			//SELECT FROM proucts 
			//WHERE id = response.productID
			//newQuantity = response.quantityAdded + stock_quantity
			// UPDATE products
			// SET stock_quantity=newQuantity
			// WHERE id = response.productID;
			console.log("Product Updated")
		})
	} else if (response.action == "Add New Product") {
		console.log("")
		console.log("FUNCTION: Add New Product. ")
		console.log("")
		inquirer.prompt([
		    {
		      type: "input",
		      message: "What would you like to add?",
		      name: "newProduct"
		    },
			{
		      type: "input",
		      message: "What is the product price?",
		      name: "newProductPrice"
		    },
		    {
		      type: "input",
		      message: "What is the starting inventory?",
		      name: "newProductInventory"
		    }
		]).then(function(response) {
			// INSERT INTO products (product_name, price, stock_quantity)
			// VALUES (response.newProduct, response.ProductPrice, response.ProductInventory);
			console.log("Product Added")
		})
	} else {
		console.log("")
		console.log("Here are ALL PRODUCUTS. ")
		console.log("")
	}
})
