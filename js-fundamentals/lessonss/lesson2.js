// Concatenation and Interpolation
var price = 80;
var itemName = "Table";
var messageToPrint = "The price of your " + itemName + " is " + price + " dollars"; // String concatenation
var messageToPrint2 = `The price of your ${itemName} is ${price} dollars`; // String interpolation
console.log(messageToPrint);
console.log(messageToPrint2);

