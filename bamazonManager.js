//bamazon
//manager view

var inquirer = require("inquirer")
var mysql = require('mysql');

var prodArray = []

var con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  database: "bamazon_db",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
});

console.log("\n|-------------------------------------------------|")
console.log("|--------------- Welcome to Bamazon --------------|")
console.log("|------------------ MANAGER MODE -----------------|")
console.log("|-------------------------------------------------|\n")

start = function() {
	inquirer.prompt([
	    {
	      type: "list",
	      message: "What would you like to do?",
	      choices: ["See All Products", "View Low Inventory", "Update Inventory", "Add New Product", "Exit"],
	      name: "action"
	    }
	]).then(function(response) {
		if (response.action == "See All Products") {
			con.query('SELECT * FROM `products`', function (error, results, fields) {
				prodArray = results
				for (i=0; i<prodArray.length; i++) {
					console.log(prodArray[i].id + ":  " + prodArray[i].product_name)
					console.log("      Price: $" + (prodArray[i].price/100).toFixed(2) + ",  " + prodArray[i].stock_quantity + " available.\n")
				}
				console.log("")
				start()
			});
		} else if (response.action == "View Low Inventory") {
			var lowInventory = 5
			con.query("SELECT * FROM products WHERE stock_quantity < ?", [lowInventory], function(error,results,fields) {
				prodArray = results
				if (prodArray.length < 1) {
					console.log("  \nALL INVENTORY UP TO MINIMUM LEVEL\n")
					start()
				} else {
					for (i=0; i<prodArray.length; i++) {
						console.log(prodArray[i].id + ":  " + prodArray[i].product_name)
						console.log("      Price: $" + (prodArray[i].price/100).toFixed(2) + ",  " + prodArray[i].stock_quantity + " available.\n")
					}
					start()
				}
			});
		} else if (response.action == "Update Inventory") {
			con.query('SELECT * FROM `products`', function (error, results, fields) {
				prodArray = results
				for (i=0; i<prodArray.length; i++) {
					console.log(prodArray[i].id + ":  " + prodArray[i].product_name)
					console.log("      Price: $" + (prodArray[i].price/100).toFixed(2) + ",  " + prodArray[i].stock_quantity + " available.\n")
				}
				inquirer.prompt([
				    {
				      type: "input",
				      message: "What product number would you like to update?",
				      name: "productID"
				    },
					{
				      type: "input",
				      message: "What is the quantity added or (-)removed?",
				      name: "quantityAdded"
				    }
				]).then(function(response) {
					var newQuantity = parseInt(response.quantityAdded) + prodArray[response.productID-1].stock_quantity
					con.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, response.productID], function(error,results,fields) {
						console.log("\nProduct: " + response.productID + " (" + prodArray[response.productID-1].product_name + ") new quantity: " + newQuantity + "\n")
						console.log("Product Updated \n")
						start()
						})
					})
			})

		} else if (response.action == "Add New Product") {
			inquirer.prompt([
			    {
			      type: "input",
			      message: "What is the name of the new product?",
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
				con.query("INSERT INTO products SET ?",
			    {
			      product_name: response.newProduct,
			      price: parseInt(response.newProductPrice),
			      stock_quantity: parseInt(response.newProductInventory)
			    }, function(error,results,fields) {
					console.log("\nProduct: " + response.newProduct + " price $" + (response.newProductPrice/100).toFixed(2) + " quantity " + response.newProductInventory + " added. \n")
					console.log("\nProduct Added\n")
					start()
				})
			})
		} else {
			con.end(function(err) {
				console.log("\nYou have successfully logged out of manager mode. \n")
			})
		}
	})
}

start()