const { faker } = require('@faker-js/faker');

module.exports = function(len = 10, patientid = 1, doctorid = 1) {
    var results = [];
    for (var ii = 0; ii < len; ii++) {
        results.push({
            id: ii + 1,
            patientid,
            diagnostic: faker.lorem.text(),
            treatment: faker.lorem.text(),
            bpressure: faker.lorem.text(),
            cweight: faker.lorem.text(),
            doctorid,
            daterecorded: faker.date.past(10)
        });


    }

    return results;
}