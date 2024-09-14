// Declarative Functions
function helloOne() {
    console.log('Hello One');
}

helloOne();

// Anonymous Function
var helloTwo = function () {
    console.log('Hello Two');
}
helloTwo();

// ES6 Arrow Function
var helloThree = () => {
    console.log('Hello Three');
}
helloThree();

// Function with Arguments
function printName(name) {
    console.log(name);
}

printName('John Doe');

// Function with Return Value
function multiplyByTwo(number) {
    return number * 2;
}

console.log(multiplyByTwo(4));
var myResult = multiplyByTwo(5);
console.log(myResult);

// Import and Export
import { printAge } from '../helpers/printHelper.js';
printAge(25);

// Import everything
import * as helper from '../helpers/printHelper.js';
helper.printAge(30);
helper.printAge(40);
