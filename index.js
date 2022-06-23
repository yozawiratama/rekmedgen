const { faker } = require('@faker-js/faker');
var jsonSql = require('json-sql')();
fs = require('fs');

const DoctorGen = require('./services/DoctorService');
const PatientGen = require('./services/PatientService');
const MedicineGen = require('./services/MedicineService');
const ConsultationGen = require('./services/ConsultationService');
const GivenMedicineGen = require('./services/GivenMedicineService');
const BillingGen = require('./services/BillingService');
const LabRecordGen = require('./services/LabRecordService');

const config = require('./config.json');


let patients = [];
let doctors = [];
let medicines = [];
let consultations = [];
let givenmedicines = [];
let billings = [];
let labrecords = [];

function generate() {
    patients = patients.concat(PatientGen(config.counter.patient))
    doctors = doctors.concat(DoctorGen(config.counter.doctor))
    medicines = medicines.concat(MedicineGen(-1))
    try {

        patients.forEach((patient, index) => {
            const selectedDoctor = doctors[faker.datatype.number({ min: 0, max: doctors.length - 1 })];
            const tempConsultations = ConsultationGen(faker.datatype.number({ min: config.counter.consultationRangeStart, max: config.counter.consultationRangeEnd }), patient.id, selectedDoctor.id);
            consultations = consultations.concat(tempConsultations);

            tempConsultations.forEach((currConsult, index) => {
                const tempGivenmedicines = GivenMedicineGen(faker.datatype.number({ min: 1, max: 5 }), currConsult.id, medicines);
                givenmedicines = givenmedicines.concat(tempGivenmedicines);

                billings.push(BillingGen(billings.length + 1, patient.id, currConsult.daterecorded));

                const hasLab = faker.datatype.number({ min: 0, max: 1 });
                if (hasLab == 1) {
                    labrecords.push(LabRecordGen(billings.length + 1, patient.id, currConsult.daterecorded))
                }
            })

        })
    } catch (error) {
        console.log('consultation length:', consultations.length)
    }
}

function savePatient() {
    let strBuilder = '';
    patients.forEach(({ id, recordno, lname, fname, gender, age, address, contact }) => {
        strBuilder = strBuilder + `
        INSERT INTO 
        patients 
        (id, recordno, lname, fname, gender, age, address, contact) 
        VALUES 
        (${id}, ${recordno}, ${lname}, ${fname}, ${gender}, ${age}, ${address}, ${contact});
        `
    })
    fs.writeFile('result_patients.sql', strBuilder, function(err) {
        if (err) return console.log(err);
        console.log('result_patients.sql created');
    });
}

function saveDoctor() {
    let strBuilder = '';
    doctors.forEach(({ id, doctorrecno, doctorname, address, contact, fieldofspecialization, dusername, dpassword }) => {
        strBuilder = strBuilder + `
        INSERT INTO 
        doctors 
        (id, doctorrecno, doctorname, address, contact, fieldofspecialization, dusername, dpassword) 
        VALUES 
        (${id}, ${doctorrecno}, ${doctorname}, ${address}, ${contact}, ${fieldofspecialization}, ${dusername}, ${dpassword});
        `
    })
    fs.writeFile('result_doctors.sql', strBuilder, function(err) {
        if (err) return console.log(err);
        console.log('result_doctors.sql created');
    });
}

function saveMedicine() {
    let strBuilder = '';
    medicines.forEach(({ id, medicinename, initalqty, datedelivered }) => {
        strBuilder = strBuilder + `
        INSERT INTO 
        medicines 
        (id, medicinename, initalqty, datedelivered) 
        VALUES 
        (${id}, ${medicinename}, ${initalqty}, ${datedelivered});
        `
    })
    fs.writeFile('result_medicine.sql', strBuilder, function(err) {
        if (err) return console.log(err);
        console.log('result_medicine.sql created');
    });
}

function saveConsultation() {
    let strBuilder = '';
    consultations.forEach(({ id, patientid, doctorid, diagnostic, treatment, bpressure, cweight, daterecorded }) => {
        strBuilder = strBuilder + `
        INSERT INTO 
        consultations 
        (id, patientid, doctorid, diagnostic, treatment, bpressure, cweight, daterecorded) 
        VALUES 
        (${id}, ${patientid}, ${doctorid}, ${diagnostic}, ${treatment}, ${bpressure}, ${cweight}, ${daterecorded}});
        `
    })
    fs.writeFile('result_consultation.sql', strBuilder, function(err) {
        if (err) return console.log(err);
        console.log('result_consultation.sql created');
    });
}

function saveGivenMedicine() {
    let strBuilder = '';
    givenmedicines.forEach(({ id, consultationid, medicineid, qty, mamount, snotes }) => {
        strBuilder = strBuilder + `
        INSERT INTO 
        given_medicines 
        (id, consultationid, medicineid, qty, mamount, snotes) 
        VALUES 
        (${id}, ${consultationid}, ${medicineid}, ${qty}, ${mamount}, ${snotes}});
        `
    })
    fs.writeFile('result_given_medicine.sql', strBuilder, function(err) {
        if (err) return console.log(err);
        console.log('result_given_medicine.sql created');
    });
}

function saveLabRecords() {
    let strBuilder = '';
    labrecords.forEach(({ id, patientid, labname, resultstatus, daterelease }) => {
        strBuilder = strBuilder + `
        INSERT INTO 
        lab_records
        (id, patientid, labname, resultstatus, daterelease) 
        VALUES 
        (${id}, ${patientid}, ${labname}, ${resultstatus}, ${daterelease}});
        `
    })
    fs.writeFile('result_lab_records.sql', strBuilder, function(err) {
        if (err) return console.log(err);
        console.log('result_lab_records.sql created');
    });
}

function saveBillings() {
    let strBuilder = '';
    billings.forEach(({ id, patientid, billamount, billingcreated }) => {
        strBuilder = strBuilder + `
        INSERT INTO 
        billings 
        (id, patientid, billamount, billingcreated) 
        VALUES 
        (${id}, ${patientid}, ${billamount}, ${billingcreated}});
        `
    })
    fs.writeFile('result_billings.sql', strBuilder, function(err) {
        if (err) return console.log(err);
        console.log('result_billings.sql created');
    });
}

generate();

savePatient();
saveDoctor();
saveMedicine();
saveConsultation();
saveGivenMedicine();
saveLabRecords();
saveBillings();