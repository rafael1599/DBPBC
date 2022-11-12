const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const times = JSON.parse(process.env.times);

console.log(times)

const firestore = new Firestore({
    projectId: times.project_id,
    times: {
        client_email: times.client_email,
        private_key: times.private_key
    }
});

const times = firestore.collection('times');

const createMenuItem = async (record) => {

    try {
        await times.add(record);
        console.log('Records created.');
    } catch (error) {
        console.log(`Error at createRecord --> ${error}`);
    }
};

let database = require('./TIV_BC_PUBLICA.json');

for (let index = 0; index < database.length; index++) {
    let element = database[index];
    element['isActive'] = true;
    createMenuItem(element);
}