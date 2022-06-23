const { faker } = require('@faker-js/faker');

const stats = ['NORMAL', 'ABNORMAL', 'UNCERTAIN']

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

module.exports = function(id, patientid = 1, daterelease = faker.date.past(10)) {
    return {
        id,
        patientid,
        labname: `${faker.name.firstName()} LAB`,
        resultstatus: stats[between(0, stats.length)],
        daterelease
    }
}