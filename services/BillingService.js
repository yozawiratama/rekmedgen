const { faker } = require('@faker-js/faker');

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

module.exports = function(id, patientid = 1, billingcreated = faker.date.past(10)) {
    return {
        id,
        patientid,
        billamount: parseInt(faker.random.numeric(3).toString().padEnd(between(6, 8))),
        billingcreated,
    }
}