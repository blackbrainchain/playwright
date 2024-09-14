
export function printAge(age) {
    console.log(`You are ${age} years old`);
}


class CustomerDetail {
    printFirstName(firstName) {
        console.log("First Name: " + firstName);
    }
}

export const customerDetail = new CustomerDetail();