// Object
var customer = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '000000000000',
    cars: ['Ford', 'Chevy', 'Honda', 'Toyota'],
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
    }
};

// Dot notation
console.log(customer.id);
console.log(customer.firstName);
console.log(customer.lastName);

// Bracket notation
console.log(customer['id']);
console.log(customer['firstName']);

customer['firstName'] = 'Jane';
console.log(customer.firstName);

customer.lastName = 'Smith';
console.log(customer.lastName);

console.log(`${customer.firstName} ${customer.lastName}`);


// Array
var cars = ['Ford', 'Chevy', 'Honda', 'Toyota'];
console.log(cars[0]);
console.log(cars[1]);

console.log(`${customer.firstName} ${customer.lastName} ${customer.cars[1]}`);
