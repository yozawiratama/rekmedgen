const { faker } = require('@faker-js/faker');
const medicines = require('../data/medicines.json')

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

module.exports = function(len = 10) {
    var results = [];
    if (len == -1) {
        for (var ii = 0; ii < medicines.length; ii++) {
            const selected = medicines[ii];
            results.push({
                id: ii + 1,
                medicinename: selected.name,
                initalqty: selected.initialqty,
                datedelivered: faker.date.past(10)
            });
        }
    }
    for (var ii = 0; ii < len; ii++) {
        const selected = medicines[between(0, medicines.length)];
        results.push({
            id: ii + 1,
            medicinename: selected.name,
            initalqty: selected.initialqty,
            datedelivered: faker.date.past(10)
        });
    }

    return results;
}