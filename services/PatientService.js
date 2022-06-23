const { faker } = require('@faker-js/faker');

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const gender = ['M', 'F']

module.exports = function(len = 10) {
    var results = [];
    for (var ii = 0; ii < len; ii++) {

        results.push({
            id: ii + 1,
            recordno: `${between(1,999).toString().padStart(3)}/${between(1,99).toString().padStart(3)}/${between(2000,new Date().getFullYear())}`,
            lname: faker.name.lastName(),
            fname: faker.name.firstName(),
            gender: gender[faker.datatype.number(0, 1)],
            age: between(0, 60),
            address: `${faker.address.streetAddress()}`,
            contact: `${faker.phone.number()}`,
        });


    }

    return results;
}