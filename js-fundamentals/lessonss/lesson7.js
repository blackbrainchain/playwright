// Loops

var i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

for (var i = 0; i < 5; i++) {
    console.log(i);
}

var cars = ['Ford', 'Chevy', 'Honda', 'Toyota'];

for (let car of cars) {
    if (car == 'Honda') break;
    console.log(car);
}

cars.forEach((car) => {
    console.log(car);
});

