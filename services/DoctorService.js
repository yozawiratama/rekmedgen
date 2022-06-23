const { faker } = require('@faker-js/faker');

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const fields = [
    'Allergy and immunology',
    'Anesthesiology',
    'Dermatology',
    'Diagnostic radiology',
    'Emergency medicine',
    'Family medicine',
    'General Practitioners',
    'Internal medicine',
    'Medical genetics',
    'Neurology',
    'Nuclear medicine',
    'Obstetrics and gynecology',
    'Ophthalmology',
    'Pathology',
    'Pediatrics',
    'Physical medicine and rehabilitation',
    'Preventive medicine',
    'Psychiatry',
    'Radiation oncology',
    'Surgery',
    'Urology'
]

function generate(len = 10) {
    var result = [];

    for (var ii = 0; ii < len; ii++) {
        let fname = faker.name.firstName()
        result.push({
            id: ii + 1,
            doctorrecno: `${between(1, 9999).toString().padStart(4, '0')}/${between(1, 9999).toString().padStart(4, '0')}/DU/SK/${between(2000, new Date().getFullYear())}`,
            doctorname: `${fname} ${faker.name.lastName()}`,
            address: `${faker.address.streetAddress()}`,
            contact: `${faker.phone.number()}`,
            fieldofspecialization: `${fields[between(0, fields.length)]}`,
            dusername: `${fname}_${faker.random.alphaNumeric(2)}`,
            dpassword: faker.random.alphaNumeric(6)
        })
    }

    return result;

}

module.exports = generate;