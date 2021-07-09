const mongoose = require('mongoose');
const schema = mongoose.Schema;

const persons = new schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    })

const Persons = mongoose.model("Persons", persons);
module.exports = Persons;