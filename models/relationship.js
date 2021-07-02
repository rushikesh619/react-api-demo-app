const mongoose = require('mongoose');
const schema = mongoose.Schema;

const relationship = new schema(
    {
        firstPerson: {
            type: String,
            required: true
        },
        secondPerson: {
            type: String,
            required: true
        },
        relation: {
            type: String,
            required: true,
        },
        conclusion: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    })

const Relationship = mongoose.model("Relationship", relationship);
module.exports = Relationship;