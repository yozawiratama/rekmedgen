const { faker } = require('@faker-js/faker');

module.exports = function(len = 10, consultationid = 1, medicines = []) {
    var results = [];
    for (var ii = 0; ii < len; ii++) {
        results.push({
            id: ii + 1,
            consultationid,
            medicineid: medicines[faker.datatype.number({ min: 0, max: medicines.length })],
            qty: parseInt(faker.random.numeric()),
            mamount: parseInt(faker.random.numeric()),
            snotes: faker.lorem.text()
        });


    }

    return results;
}