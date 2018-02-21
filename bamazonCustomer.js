//bamazon
// USE bamazon_db;
var inquirer = require("inquirer")
var mysql = require('mysql')
var prodArray = []

var con = mysql.createConnection({
  host: "localhost",
  port: "8889",
  database: "bamazon_db",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
});

console.log("")
console.log("|----------------------------------------|")
console.log("|---------- Welcome to Bamazon ----------|")
console.log("|----------------------------------------|")
console.log("")

promptUser = function() {
	inquirer.prompt([
		{
  		type: "input",
  		message: "  What item number would you like to order?",
  		name: "productOrdered"
		},
		{
		type: "input",
		message: "  How many would you like to order?",
		name: "quantityOrdered"
		}
		]).then(function(response) {
			if (response.productOrdered && response.quantityOrdered) {
				console.log("")
				console.log("YOUR ORDER HAS BEEN RECEIVED")
				console.log("")
				var prodIDIndex = response.productOrdered-1
				var prodIDOrdered = parseInt(prodArray[prodIDIndex].id)
				var numOrdered = parseInt(response.quantityOrdered)
				var prodNameOrdered = prodArray[prodIDIndex].product_name
				var prodPrice = parseInt(prodArray[prodIDIndex].price)
				var quantityAvailable = parseInt(prodArray[prodIDIndex].stock_quantity)
				if (numOrdered <= quantityAvailable) {
					var stockRemaining = quantityAvailable - numOrdered
					con.query("UPDATE products SET stock_quantity=? WHERE id=?", [stockRemaining, prodIDOrdered], function (error, results, fields) {
						if (error) throw error;
						var orderTotal = prodPrice * numOrdered
						console.log("  Thank you for your order of " + numOrdered + " " + prodNameOrdered + " at $" + (prodPrice/100).toFixed(2) + " a piece. Your total is " + "$" + (orderTotal/100).toFixed(2) + ".")
						console.log("")
						placeOrder() 
					})	
				} else {
					console.log("Product ID: " + prodIDOrdered + " Number requested: " + numOrdered + " Stock Available: " + quantityAvailable)
					console.log("  Sorry, we don't have that many in stock.")
					console.log("")
					placeOrder()
				}
			} else {
				console.log(" ")
				console.log("Sorry, " + response.productOrdered + " " + response.quantityOrdered + " is not a valid order. Please specify a valid product and quantity.")
				placeOrder() 
			}
		})
	}

placeOrder = function() {
	inquirer.prompt([ //place this whole thing inside placeOrder
	    {
	      type: "confirm",
	      message: "Would you like to place an order?",
	      name: "confirm",
	      default: true
	  	}
	]).then(function(response) {
		if (response.confirm) {
			console.log("")
			console.log("Great, let's get started. ")
			console.log("")
			console.log("Here are the items in stock: ")
			console.log("")
			con.query('SELECT * FROM `products`', function (error, results, fields) {
				prodArray = results
				for (i=0; i<prodArray.length; i++) {
					console.log(prodArray[i].id + ":  " + prodArray[i].product_name)
					console.log("      Price: $" + (prodArray[i].price/100).toFixed(2) + ",  " + prodArray[i].stock_quantity + " available.")
				}
				console.log("")
				promptUser()
			});

		} else {
			console.log("")
			console.log("   Hey, no problem! Thank you for trying Bamazon.")
			con.end(function(err) {
				console.log("   Please come back again some time.")
			})
		}
	})
}

placeOrder()